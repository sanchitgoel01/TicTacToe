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

        const playerNum = numConnections + 1;

        this._setPlayer(playerNum, socket);

        const cTurn = playerNum == 1 ? 'X' : 'O';
        socket.emit('set-turn', cTurn);

        this._initSocketListeners(socket, cTurn, playerNum);

        // Two connections. Allow player 1 to start selecting!
        if (numConnections == 1) {
            this.#player1.emit('enable-turn');
        }
    }

    // playerNum is either 1 for player1 or 2 for player2.
    _initSocketListeners(socket, cTurn, playerNum) {
        socket.on('cell-clicked', (data) => {
            // FIXME DEBUG
            console.log("Recieved Cell Clicked!");

            // Validate click
            if (this.#gameBoard.isGameOver || this.#gameBoard.currentTurn != cTurn) {
                console.log("Error: " + cTurn + " sent a cell-click at the wrong time. Ignoring!");
                return;
            }

            const row = data.row;
            const col = data.col;

            console.log("Cell Pos Row: " + row + ". Col: " + col);
            const otherSocket = playerNum == 1 ? this.#player2 : this.#player1; // If client turn is 1, we want 2 socket.

            this.#gameBoard.cellClicked(row, col);
            otherSocket.emit('fill-cell', { row, col });

            if (this.#gameBoard.isGameOver) {
                const win = this.#gameBoard.rawWin;
                console.log("Game Over! Result: " + win);
                socket.emit('end-game', win);
                otherSocket.emit('end-game', win);
                // Disconnect both sockets
                socket.disconnect();
                otherSocket.disconnect();
                if (this.#endGameRunnable)
                    this.#endGameRunnable();
            }
            else {
                // Send enable turn to the other connection.
                console.log("It is now player " + (cTurn == 'X' ? 'O' : 'X') + " turn!");
                otherSocket.emit('enable-turn');
            }
        });

        // TODO Handle Disconnect Properly
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