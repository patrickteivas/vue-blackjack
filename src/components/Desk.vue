<template>
  <div v-if="$store.state.isPlaying">
    <Hand :player="$store.state.players[0]"/>
    <Hand :player="$store.state.players[1]"/>
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