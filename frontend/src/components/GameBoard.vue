<template>
  <div id="gameboard">
    <p style="font-size: 0.75rem">
      Game Code: <b>{{ gameCode }}</b> <br><br>
      You are playing as <b>{{ board.playerMark }}</b>!
    </p>
    <h3>
      {{ getStatusMsg() }}
    </h3>
    <div class="container stack">
      <template v-for="row in 3" :key="'row-' + row">
        <div class="row center">
          <Cell
            :mark="getMark(row - 1, col - 1)"
            :pos="[row - 1, col - 1]"
            @cell-clicked="cellClicked(row - 1, col - 1)"
            v-for="col in 3"
            :key="'cell-' + row + col"
            :canInteract="canInteract"
          />
        </div>
      </template>
    </div>
    <div v-if="board.isGameOver">
      <h3>{{ gameResultMsg }}!</h3>
      <RematchButton :socket="socket" @rematch="resetGame()" />
    </div>
  </div>
</template>

<script>
import Cell from "./Cell";
import RematchButton from "./RematchButton";
import DummyBoard from "../js/DummyBoard";

export default {
  name: "GameBoard",
  props: ["socket", "gameCode"],
  components: {
    Cell,
    RematchButton,
  },
  data: function () {
    return {
      canInteract: false,
      board: new DummyBoard(),
    };
  },
  created() {
    // Enable interaction
    this.socket.on("enable-turn", () => {
      this.canInteract = true;
    });

    this.socket.on("fill-cell", (data) => {
      const row = data.row;
      const col = data.col;
      const mark = data.mark;
      this.board.fillCell(row, col, mark);
    });

    this.socket.on("end-game", (result) => {
      this.canInteract = false;
      this.board.gameResult = result;
    });
    // Fetch the board from the server.
    this.socket.emit("fetch-board");
    // Fetch the game data from the server.
    this.socket.emit("fetch-data", (data) => {
      this.board.playerMark = data.mark;
      this.board.gameResult = data.gameResult;
    });
  },
  methods: {
    getMark: function (row, col) {
      return this.board.getCell(row, col);
    },
    cellClicked: function (row, col) {
      if (this.board.isGameOver || !this.canInteract) return;

      // Set board position
      this.board.fillCell(row, col);
      // Disable interaction
      this.canInteract = false;
      // Uses current turn, so must be called before turn is changed
      this.socket.emit("cell-clicked", { row, col });
    },
    getStatusMsg() {
      if (this.board.isGameOver) return "Game Over!";

      if (!this.canInteract) return "Waiting for other player...";

      return "It is your turn!";
    },
    resetGame() {
      this.board.reset();
    },
  },
  computed: {
    gameResultMsg() {
      if (!this.board.isGameOver) return "";

      if (this.board.isWinner)
        return "You won";

      if (this.board.isDraw) return "The game is a draw";

      return "You lost";
    },
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
