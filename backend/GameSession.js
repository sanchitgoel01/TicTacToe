const GameBoard = require("./Gameboard.js")

class GameSession {

    // Private Variables:
    #gameBoard = new GameBoard();
    #player1 = undefined; // Socket
    #player2 = undefined; // Socket
    #endGameRunnable = undefined; // Function

    addConnection(socket) {
        const numConnections = this.numConnections;

        // Handle overflow
        if (numConnections == 2)
            return;

        const playerNum = this._getUnsetPlayerNum();

        // Invalid Player Num
        if (playerNum == 0)
            return;

        this._setPlayer(playerNum, socket);

        const cTurn = playerNum == 1 ? 'X' : 'O';
        socket.emit('set-turn', cTurn);

        this._initSocketListeners(socket, cTurn, playerNum);

        // Two connections. Allow player to start selecting.
        if (numConnections == 1) {
            const currTurn = this.#gameBoard.currentTurn;
            if (currTurn == 'X')
                this.#player1.emit('enable-turn');
            else
                this.#player2.emit('enable-turn');
        }
    }

    // playerNum is either 1 for player1 or 2 for player2.
    _initSocketListeners(socket, cTurn, playerNum) {
        // Called when a client clicks on a cell on the board.
        socket.on('cell-clicked', (data) => {
            console.log("Recieved Cell Clicked!"); // FIXME DEBUG

            // Validate click
            if (this.#gameBoard.isGameOver || this.#gameBoard.currentTurn != cTurn) {
                console.log("Error: " + cTurn + " sent a cell-click at the wrong time. Ignoring!");
                return;
            }

            const row = data.row;
            const col = data.col;

            console.log("Cell Pos Row: " + row + ". Col: " + col); // FIXME DEBUG
            const otherSocket = playerNum == 1 ? this.#player2 : this.#player1; // If client turn is 1, we want 2 socket.

            this.#gameBoard.cellClicked(row, col);
            if (otherSocket)
                otherSocket.emit('fill-cell', { row, col, mark: cTurn });

            if (this.#gameBoard.isGameOver) {
                const win = this.#gameBoard.rawWin;
                console.log("Game Over! Result: " + win); // FIXME DEBUG
                // Send Game over and Disconnect both sockets
                socket.emit('end-game', win);
                socket.disconnect();
                if (otherSocket) {
                    otherSocket.emit('end-game', win);
                    otherSocket.disconnect();
                }
                if (this.#endGameRunnable)
                    this.#endGameRunnable();
            }
            else {
                // Send enable turn to the other connection.
                console.log("It is now player " + (cTurn == 'X' ? 'O' : 'X') + " turn!"); // FIXME DEBUG
                if (otherSocket)
                    otherSocket.emit('enable-turn');
            }
        });

        // Called when the client disconnects from the game. Just unset the respective player socket.
        socket.on('disconnect', () => {
            console.log('Game Session Socket disconnection'); // FIXME DEBUG
            const connections = this.numConnections;
            // Clear socket on disconnect
            if (this.#player1 == socket)
                this.#player1 = undefined;
            else if (this.#player2 == socket)
                this.#player2 = undefined;
            
            // There was only one connection, so just delete the session
            if (connections == 1 && this.#endGameRunnable)
                this.#endGameRunnable();
        });

        // Called when the client initializes the gameboard.
        socket.on('fetch-board', () => {
            console.log("Fetch board was called!"); // FIXME DEBUG
            // Exit if no turns have been made.
            if (this.#gameBoard.numberOfTurns == 0)
                return;

            const board = this.#gameBoard.markedBoard;
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    const boardMark = board[row][col];
                    if (boardMark.length > 0)
                        socket.emit('fill-cell', { row, col, mark: boardMark });
                }
            }
        });
    }

    getSocket(playerNum) {
        return playerNum == 1 ? this.#player1 : this.#player2;
    }

    _setPlayer(playerNum, socket) {
        // Set player
        if (playerNum == 1)
            this.#player1 = socket;
        else if (playerNum == 2)
            this.#player2 = socket;
    }

    _getUnsetPlayerNum() {
        if (!this.#player1)
            return 1;
        else if (!this.#player2)
            return 2;
        else
            return 0;
    }

    onEndGame(runnable) {
        this.#endGameRunnable = runnable;
    }

    // Broadcasts an event to all available player sockets
    broadcast(key, data) {
        if (this.#player1)
            this.#player1.emit(key, data);
        if (this.#player2)
            this.#player2.emit(key, data);
    }

    get numConnections() {
        var connections = 0;
        if (this.#player1)
            connections++;

        if (this.#player2)
            connections++;

        return connections;
    }

}

module.exports = GameSession;