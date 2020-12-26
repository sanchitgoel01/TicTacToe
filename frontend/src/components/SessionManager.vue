<template>
  <!-- Template Wrapper -->
  <div>
    <div v-if="!isWaiting">
      <div class="flex container stack mx-auto w-25p" v-if="!showJoinGameInput">
        <button class="session-btn" @click="newGame()">New Game</button>
        <button class="mt-3 session-btn" @click="showJoinGameInput = true">
          Join Game
        </button>
      </div>
      <div class="flex container stack mx-auto w-25p" v-else>
        <p>Game Code:</p>
        <input v-model="gameCodeInput" />
        <button class="mt-2 h-3rm" @click="onJoinGameClck()">Join</button>
        <button
          class="mt-2 h-3rm"
          @click="
            showJoinGameInput = false;
            error = '';
          "
        >
          Cancel
        </button>
      </div>
      <p v-if="error != ''">Error: {{ error }}</p>
    </div>
    <div v-else class="flex container stack mx-auto w-25p">
      <h3>Game Code: {{ gameCode }}</h3>
      <h3>Waiting for another player to join...</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "SessionManager",
  props: ["socket"],
  data() {
    return {
      showJoinGameInput: false,
      isWaiting: false,
      gameCodeInput: "", // Game code Input
      gameCode: "", // Actual Game Code
      error: "",
    };
  },
  emits: ["enter-game"],
  created() {
    this.socket.on("joined-game", (data) => {
      console.log("A client joined the game!");
      console.log("Game Code:" + data.gameCode);
      this.gameCodeInput = "";
      this.gameCode = data.gameCode;
      if (data.numPlayers < 1) {
        this.isWaiting = true;
      } else {
        this.socket.removeAllListeners("joined-game");
        this.$emit("enter-game", gameCode);
      }
    });

    this.socket.on("invalid-code", (error) => {
      this.error = error;
    });
  },
  methods: {
    newGame() {
      console.log("Create a new game!"); // FIXME DEBUG
      this.socket.emit("new-game");
    },
    onJoinGameClck() {
      console.log("Game Code Input: " + this.gameCodeInput); // FIXME DEUBG

      if (this.gameCodeInput.length == 0) return;

      this.socket.emit("join-game", this.gameCodeInput.toLowerCase());
    },
  },
};
</script>

<style scoped>
.session-btn {
  height: 3rem;
  border-radius: 2%;
}
</style>