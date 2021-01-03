// gameboard.cellClicked(row, col);
// gameboard.isWin();
// gameboard.currentTurn();
// gameboard.reset();

class GameBoard {
    // Private Variables:
    #currentTurn = 'X';
    #board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    #winner = 0; // 0 = No win, 1 = X Win, 2 = O Win, 3 = Draw
    #numTurns = 0;

    // Methods:
    cellClicked(row, col) {
        // Ignore if game already won
        if (this.#winner != 0)
            return;

        this.#numTurns++;

        this.#board[row][col] = this.#currentTurn == "X" ? 1 : -1;

        const isWinner = this._hasWon(row, col);
        if (isWinner) {
            this.#winner = this.#currentTurn == "X" ? 1 : 2;
        }
         // Is a draw
         else if (this.#numTurns == 9) {
            this.#winner = 3;
        } else {
            // Switch turn
            this.#currentTurn = this.#currentTurn == "X" ? "O" : "X";
        }
    }

    _hasWon(row, col) {
        const side = this.#currentTurn == "X" ? 1 : -1;
        var hasWon = true;
        // Check the entire row
        for (var lCol = 0; lCol < 3; lCol++) {
            if (this.#board[row][lCol] != side) {
                hasWon = false;
                break;
            }
        }
        // Check the entire column
        if (hasWon) return true;

        hasWon = true;
        for (var lRow = 0; lRow < 3; lRow++) {
            if (this.#board[lRow][col] != side) {
                hasWon = false;
                break;
            }
        }

        if (hasWon) return true;

        if (row == col || (row == (2 - col))) {
            // Check diagnol and counter-diagnol
            hasWon = true;
            for (var diag = 0; diag < 3; diag++) {
                if (
                    this.#board[diag][diag] != side &&
                    this.#board[diag][2 - diag] != side
                ) {
                    hasWon = false;
                    break;
                }
            }

            return hasWon;
        }

        return false;
    }

    reset() {
        this.#currentTurn = 'X';
        this.#board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        this.#winner = 0; // 0 = No win, 1 = X Win, 2 = O Win, 3 = Draw
        this.#numTurns = 0;
    }

    // Getters
    get hasWinner() {
        return this.#winner == 1 || this.#winner == 2;
    }

    get isDraw() {
        return this.#winner == 3;
    }

    get isGameOver() {
        return this.#winner != 0;
    }

    get currentTurn() {
        return this.#currentTurn;
    }

    get rawWin() {
        return this.#winner;
    }

    get markedBoard() {
        var markedBoard = [['', '', ''], ['', '', ''], ['', '', '']];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const boardVal = this.#board[row][col];
                if (boardVal != 0)
                    markedBoard[row][col] = boardVal == 1 ? 'X' : 'O';
            }
        }
        return markedBoard;
    }

    get numberOfTurns() {
        return this.#numTurns;
    }
}

module.exports = GameBoard