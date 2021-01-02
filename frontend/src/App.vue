<template>
  <div>
    <h1>Tic-Tac-Toe</h1>
    <SessionManager v-if="!inGame" :socket="socket" @enter-game="enterGame" />
    <GameBoard :socket="socket" :gameCode="gameCode" v-else />
  </div>
</template>

<script>
import GameBoard from "./components/GameBoard.vue";
import SessionManager from "./components/SessionManager.vue";
import io from "socket.io-client";

var socketURL = '/';

// If development, use localhost:3000 since node server and front-end run separately.
if (process.env.NODE_ENV == 'development')
  socketURL = 'http://localhost:3000';

export default {
  name: "App",
  components: {
    GameBoard,
    SessionManager,
  },
  data() {
    return {
      socket: io(socketURL, {
        withCredentials: true,
        autoConnect: false,
      }),
      inGame: false,
      gameCode: "",
    };
  },
  methods: {
    enterGame(gameCode) {
      this.gameCode = gameCode;
      this.inGame = true;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
