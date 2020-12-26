<template>
  <div id="gameboard">
    <h5>Game Code: {{ gameCode }}</h5>
    <h3>
      {{ getStatusMsg() }}
    </h3>
    <div class="container stack">
      <template v-for="row in 3" :key="'row-' + row">
        <div :class="'row center ' + (row > 1 ? 'top-space' : '')">
          <Cell
            :mark="getMark(row - 1, col - 1)"
            @cell-clicked="cellClicked(row - 1, col - 1)"
            v-for="col in 3"
            :key="'cell-' + row + col"
            :canInteract="canInteract"
          />
        </div>
      </template>
    </div>
    <div v-if="gameResult != 0">
      <h3>
        {{ gameResultMsg }}!
      </h3>
      <!-- <button @click="resetGame">Reset!</button> -->
    </div>
  </div>
</template>

<script>
import Cell from "./Cell";

export default {
  name: "GameBoard",
  props: ['socket', 'gameCode'],
  components: {
    Cell,
  },
  data: function () {
    return {
      turn: "X",
      // 0 = Game still running, 1 = X, 2 = O, 3 = Draw
      gameResult: 0,
      canInteract: false,
      board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    };
  },
  created() {
    console.log("GAMEBOARD CREATED!");
    // Set Turn at the beginning
    this.socket.on('set-turn', (turn) => {
      // FIXME DEBUG
      console.log('Set turn to ' + turn);
      this.turn = turn;
    });

    // Enable interaction
    this.socket.on('enable-turn', () => {
      // FIXME DEBUG
      console.log('Enabling interaction!');
      this.canInteract = true;
    });

    this.socket.on('fill-cell', (data) => {
      const row = data.row;
      const col = data.col;
      // FIXME DEBUG
      console.log('Filling cell! Row: ' + row + ". Col:" + col);
      const mark = this.turn == 'X' ? -1 : 1;
      this.board[row][col] = mark;
    });

    this.socket.on('end-game', (result) => {
      console.log("Received End Game socket! Result: " + result);
      this.canInteract = false;
      this.gameResult = result;
      // Close Socket to prevent any other connections
      this.socket.close();
    });
  },
  methods: {
    getMark: function (row, col) {
      const posVal = this.board[row][col];
      if (posVal == 1) return "X";
      else if (posVal == -1) return "O";
      else return "";
    },
    cellClicked: function (row, col) {
      if (this.gameResult != 0 || !this.canInteract)
        return;

      // Set board position
      this.board[row][col] = this.turn == "X" ? 1 : -1;
      // Disable interaction
      this.canInteract = false;
      // Uses current turn, so must be called before turn is changed
      this.socket.emit('cell-clicked', { row, col });
    },
    getStatusMsg() {
      if (this.gameResult != 0)
        return "Game Over!";
      
      if (!this.canInteract)
        return "Waiting for other player..."

      return "It is your turn!";
    },
    resetGame() {
      this.gameResult = 0;
      // Reset board
      for (var iRow = 0; iRow < 3; iRow++) {
        for (var iCol = 0; iCol < 3; iCol++) {
          this.board[iRow][iCol] = 0;
        }
      }
      // Reset turns
      this.numTurns = 0;
      // Reset turn
      this.turn = "X";
      this.isRunning = true;
    },
  },
  computed: {
    gameResultMsg() {
      if (this.gameResult == 0)
        return "";

      if ((this.gameResult == 1 && this.turn == 'X')
          || (this.gameResult == 2 && this.turn == 'O'))
        return "You won";

      if (this.gameResult == 3)
        return 'The game is a draw';

      return "You lost";
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-space {
  margin-top: 0.05rem;
}

.box {
  height: 100px;
  width: 100px;
  border: 5px solid green;
  margin-left: 1px;
  margin-right: 1px;
}
.grid {
  display: flex; /* establish flex container */
  flex-wrap: wrap; /* enable flex items to wrap */
  justify-content: space-around;
}
</style>