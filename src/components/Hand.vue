<template>
  <v-col sm="4" offset-sm="4">
    <v-card>
      <v-card-title>
        Player {{ player.id }} - {{player.score + playerWinStatus}}
      </v-card-title>
      <v-container fluid>
        <v-row>
          <v-col
                v-for="(card, index) in player.cards"
                :key="index"
                class="d-flex child-flex"
                cols="3"
          >
              <v-img :src="card.image" />
          </v-col>
        </v-row>
        <v-container fluid>
          <v-row>
            <div class="my-2">
              <v-btn color="deep-purple accent-4" @click="hitMe" :disabled="player.id !== $store.state.whoseTurn">Hit me</v-btn>
            </div>
            <div class="my-2 ml-2">
              <v-btn color="deep-purple accent-4" @click="stay" :disabled="player.id !== $store.state.whoseTurn">Stay</v-btn>
            </div>
          </v-row>
        </v-container>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      playerWinStatus: ''
    };
  },
  props: ['player'],
  methods: {
    async hitMe() {
      const newCard = await this.$store.dispatch('drawCards');
      this.$store.commit('ADD_CARD_TO_PLAYER', {id: this.player.id, card: newCard});
      this.$store.dispatch('updatePlayerScore', this.player.id);
      if(this.player.score > 21) {
        this.$store.commit('SET_RESULT_TITLE', 'PLAYER ' + this.player.id + ' LOST');
        this.$store.commit('SET_WHOSE_TURN', 0);
      }
    },
    stay() {
      if(this.player.id === 2) {
        const playerOneScoreOffset = 21 - this.$store.state.players[0].score;
        const playerTwoScoreOffset = 21 - this.$store.state.players[1].score;

        if(playerOneScoreOffset===playerTwoScoreOffset) {
          this.$store.commit('SET_RESULT_TITLE', 'DRAW');
        } else if (playerOneScoreOffset>playerTwoScoreOffset) {
          this.$store.commit('SET_RESULT_TITLE', 'PLAYER 2 WIN');
        } else {
          this.$store.commit('SET_RESULT_TITLE', 'PLAYER 2 LOST');
        }
        this.$store.state.whoPlaying = 0;
      } else {
        this.$store.commit('SET_WHOSE_TURN', 2);
      }
    }
  }
};
</script>

<style scoped>

</style>