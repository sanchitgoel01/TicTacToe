<template>
  <button id="rematch-btn" :disabled="isDisabled" @click="btnClick">
    {{ rematchText }}
  </button>
</template>

<script>
// Button States
const REQUEST = 0;
const ACCEPT = 1;
const REQUESTED = 2;
const INVALID = 3;

export default {
  name: "RematchButton",
  props: ["socket"],
  events: ["rematch"],
  data() {
    return {
      state: REQUEST,
      isDisabled: false,
      rematchText: "Request Rematch",
    };
  },
  created() {
    this.socket.on("rematch-requested", () => {
      this.state = ACCEPT;
      this.rematchText = "Accept Rematch!";
    });

    this.socket.on("reset-game", () => {
      // Reset state
      this.state = REQUEST;
      this.isDisabled = false;
      this.rematchText = "Request Rematch";
      this.$emit("rematch");
    });
  },
  methods: {
    btnClick() {
      // Button was already clicked
      if (this.state == REQUESTED || this.state == INVALID)
        return;

      this.isDisabled = true;
      this.state = REQUESTED;
      this.rematchText = "Rematch Requested";

      this.socket.emit("request-rematch", (result) => {
        if (result == "invalid") {
          this.state = INVALID;
          this.rematchText = "Rematch Denied!";
        }
      });
    },
  },
};
</script>

<style scoped>
#rematch-btn {
  height: 2.25rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-family: "Verdana";
  background-color: #4caf50;
  color: white;
}
#rematch-btn:disabled,
#rematch-btn[disabled] {
    background-color: #7c9b7d
}
</style>