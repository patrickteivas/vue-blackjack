<template>
  <v-col sm="4" offset-sm="4">
    <v-card>
      <v-card-title>
        Player {{ player }} - {{playerScore + playerWinStatus}}
      </v-card-title>
      <v-container fluid>
        <v-row>
          <v-col
                v-for="(card, index) in cards"
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
              <v-btn color="deep-purple accent-4" @click="hitMe" :disabled="player !== $store.state.whoPlaying">Hit me</v-btn>
            </div>
            <div class="my-2 ml-2">
              <v-btn color="deep-purple accent-4" @click="stay" :disabled="player !== $store.state.whoPlaying">Stay</v-btn>
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
  props: ['cards', 'player'],
  computed: {
    playerScore() {
      let score = 0;
      this.cards.forEach(card => score += parseInt(card.weight));
      return score;
    }
  },
  methods: {
    async hitMe() {
      const newCard = await this.$store.dispatch('drawCards');
      this.$store.commit(this.player === 1 ? 'ADD_PLAYER_ONE_CARDS' : 'ADD_PLAYER_TWO_CARDS', newCard);
      if(this.playerScore > 21) {
        this.$store.commit('SET_RESULT_TITLE', 'PLAYER ' + this.player + ' LOST');
        this.$store.state.whoPlaying = 0;
      }
    },
    stay() {
      this.$store.commit(this.player === 1 ? 'SET_PLAYER_ONE_SCORE' : 'SET_PLAYER_TWO_SCORE', this.playerScore);
      if(this.player === 2) {
        const playerOneScoreOffset = 21 - this.$store.state.playerOneScore;
        const playerTwoScoreOffset = 21 - this.$store.state.playerTwoScore;

        if(playerOneScoreOffset===playerTwoScoreOffset) {
          this.$store.commit('SET_RESULT_TITLE', 'DRAW');
        } else if (playerOneScoreOffset>playerTwoScoreOffset) {
          this.$store.commit('SET_RESULT_TITLE', 'PLAYER 2 WIN');
        } else {
          this.$store.commit('SET_RESULT_TITLE', 'PLAYER 2 LOST');
        }
        this.$store.state.whoPlaying = 0;
      } else {
        this.$store.state.whoPlaying = 2;
      }
    }
  }
};
</script>

<style scoped>

</style>