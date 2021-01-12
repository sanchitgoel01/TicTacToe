<template>
  <!-- Template Wrapper -->
  <div>
    <div id="session-menu" class="flex container stack mx-auto">
      <!-- New Game Waiting State -->
      <template v-if="isWaiting">
        <h3>Game Code: {{ gameCode.toUpperCase() }}</h3>
        <h3>Waiting for another player to join...</h3>
        <button class="session-btn" @click="onCancelGameClck()">
          Cancel Game
        </button>
      </template>
      <!-- Join Game State -->
      <template v-else-if="showJoinGameInput">
        <h3>Game Code:</h3>
        <input id="codeInput" v-model="gameCodeInput" />
        <button class="mt-3 session-btn" @click="onJoinGameClck()">Join</button>
        <button
          class="mt-2 session-btn"
          @click="
            showJoinGameInput = false;
            error = '';
          "
        >
          Cancel
        </button>
      </template>
      <!-- Main Menu State-->
      <template v-else>
        <button class="session-btn" @click="newGame()">New Game</button>
        <button class="mt-3 session-btn" @click="showJoinGameInput = true">
          Join Game
        </button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "SessionManager",
  props: ["socket"],
  data() {
    return {
      attemptedConnection: false, // Used to prevent sending duplicate requests
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
      this.attemptedConnection = false;
      if (data.error) {
        this.error = data.error;
        return;
      }

      this.gameCodeInput = "";
      this.gameCode = data.gameCode;
      if (data.numPlayers < 1) {
        this.isWaiting = true;
      } else {
        this.socket.removeAllListeners("joined-game");
        this.$emit("enter-game", this.gameCode);
      }
    });
  },
  methods: {
    newGame() {
      // Prevent double sending
      if (this.attemptedConnection) return;

      this.attemptedConnection = true;

      if (!this.socket.connected) this.socket.open();

      this.socket.emit("new-game");
    },
    onJoinGameClck() {
      // Prevent double connection
      if (this.attemptedConnection
          || this.gameCodeInput.length == 0) return;

      this.attemptedConnection = true;

      if (!this.socket.connected) this.socket.open();

      this.socket.emit("join-game", this.gameCodeInput.toLowerCase());
    },
    onCancelGameClck() {
      // Tell server to cancel new game
      this.socket.emit("cancel-creation", this.gameCode);
      // Reset game code and waiting state.
      this.gameCode = "";
      this.isWaiting = false;
    },
  },
};
</script>

<style scoped>
/* Increase width on mobile screens */
@media (min-width: 768px) {
  #session-menu {
    width: 25%;
  }
}

@media (max-width: 768px) {
  #session-menu {
    width: 75%;
  }
}

.session-btn {
  height: 3.25rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-family: "Verdana";
  background-color: #4caf50;
  color: white;
}

#codeInput {
  width: 50%;
  height: 1.25rem;
  text-align: center;
  margin: auto;
}
</style>