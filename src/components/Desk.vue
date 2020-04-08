<template>
  <div v-if="$store.state.isPlaying">
    <Hand :cards="$store.state.playerOneCards" :player="1"/>
    <Hand :cards="$store.state.playerTwoCards" :player="2"/>
  </div>
</template>

<script>
import Hand from './Hand';
export default {
  components: {Hand}
};
</script>

<style scoped>

</style>