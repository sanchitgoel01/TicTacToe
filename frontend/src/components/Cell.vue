<template>
  <div class="cell" @click="cellClick">
    <p v-if="mark.length > 0" class="unselectable">{{ mark }}</p>
  </div>
</template>

<script>
export default {
  name: "Cell",
  props: {
    mark: String,
    canInteract: Boolean,
  },
  emits: [ "cell-clicked" ],
  methods: {
    cellClick: function() {
        if(!this.canInteract || this.mark.length > 0)
          return;

        // FIXME DEBUG
        console.log("Cell Click Validated!");
        this.$emit('cell-clicked');
    },
  },
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
  border: 5px solid green;
  margin-left: 1px;
  margin-right: 1px;
}
</style>