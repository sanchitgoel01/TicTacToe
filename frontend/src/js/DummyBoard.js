const BOARD_VALUES = { EMPTY: 0, X: 1, O: -1 };
Object.freeze(BOARD_VALUES);

const GAME_RESULT = { RUNNING: 0, X_WIN: 1, O_WIN: 2, DRAW: 3 };
Object.freeze(GAME_RESULT);

// A tic-tac-toe gameboard that only keeps track of cell values, but has no game logic.
export default class DummyBoard {
    _mark = '';
    _board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    _result = 0;


    get isGameOver() {
        return this._result != GAME_RESULT.RUNNING;
    }

    get isDraw() {
        return this._result == GAME_RESULT.DRAW;
    }

    get isWinner() {
        if ((this._mark == 'X' && this._result == GAME_RESULT.X_WIN)
        || (this._mark == 'O' && this._result == GAME_RESULT.O_WIN))
            return true;

        return false;
    }

    set gameResult(resultVal) {
        this._result = resultVal;
    }

    set playerMark(mark) {
        this._mark = mark;
    }

    get playerMark() {
        return this._mark;
    }

    getCell(row, col) {
        const cellVal = this._board[row][col];
        if (cellVal == BOARD_VALUES.EMPTY)
            return '';
        if (cellVal == BOARD_VALUES.O)
            return 'O';
        if (cellVal == BOARD_VALUES.X)
            return 'X';
    }

    fillCell(row, col, mark=this._mark) {
        let mark_val;
        if (mark == 'X')
            mark_val = BOARD_VALUES.X;
        else if (mark == 'O')
            mark_val = BOARD_VALUES.O;
        else
            mark_val = BOARD_VALUES.EMPTY;
        
        this._board[row][col] = mark_val;
    }

    reset() {
        this._result = GAME_RESULT.RUNNING;
        this.clearBoard();
    }

    clearBoard() {
        // Reset board
        for (var iRow = 0; iRow < 3; iRow++) {
            for (var iCol = 0; iCol < 3; iCol++) {
                this._board[iRow][iCol] = BOARD_VALUES.EMPTY;
            }
        }
    }

}