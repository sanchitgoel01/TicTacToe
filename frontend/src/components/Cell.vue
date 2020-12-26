<template>
  <div :class="'cell ' + borderStyle" @click="cellClick">
    <p v-if="mark.length > 0" class="unselectable">{{ mark }}</p>
  </div>
</template>

<script>
export default {
  name: "Cell",
  props: {
    mark: String,
    canInteract: Boolean,
    pos: Array
  },
  emits: [ "cell-clicked" ],
  methods: {
    cellClick: function() {
        if(!this.canInteract || this.mark.length > 0)
          return;

        console.log("Cell Click Validated!"); // FIXME DEBUG
        this.$emit('cell-clicked');
    },
  },
  computed: {
    // Compute borders depending on cell position
    borderStyle() {
      const row = this.pos[0];
      const col = this.pos[1];

      let style = "";

      // Check if center
      if (col == 1) {
        style += "bord-left bord-right";
      }

      if (row != 2) {
        style += " bord-down";
      }

      return style;
    }
  }
};
</script>

<style scoped>
p {
    margin: auto;
    width: 100%;
    height: 100%;
    font-size: 500%;
}

.cell {
  height: 100px;
  width: 100px;
}

.bord-left {
  border-left: 5px solid green; 
}

.bord-right {
  border-right: 5px solid green;
}

.bord-down {
  border-bottom: 5px solid green;
}

.bord-up {
  border-top: 5px solid green;
}
</style>