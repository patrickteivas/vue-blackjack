import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    deckId: null,
    isPlaying: false,
    playerOneCards: [],
    playerTwoCards: [],
    whoPlaying: 1,
    playerOneScore: 0,
    playerTwoScore: 0,
    resultTitle: ''
  },
  mutations: {
    SET_DECK_ID(state, payload) {
      state.deckId = payload;
    },
    SET_IS_PLAYING(state, payload) {
      state.isPlaying = payload;
    },
    ADD_PLAYER_ONE_CARDS(state, payload) {
      state.playerOneCards.push(...payload);
    },
    ADD_PLAYER_TWO_CARDS(state, payload) {
      state.playerTwoCards.push(...payload);
    },
    SET_PLAYER_ONE_CARDS(state, payload) {
      state.playerOneCards = payload;
    },
    SET_PLAYER_TWO_CARDS(state, payload) {
      state.playerTwoCards = payload;
    },
    SET_WHO_PLAYING(state, payload) {
      state.whoPlaying = payload;
    },
    SET_PLAYER_ONE_SCORE(state, payload) {
      state.playerOneScore = payload;
    },
    SET_PLAYER_TWO_SCORE(state, payload) {
      state.playerTwoScore = payload;
    },
    SET_RESULT_TITLE(state, payload) {
      state.resultTitle = payload;
    }
  },
  actions: {
    async startGame(context) {
      await context.dispatch('initDeck');
      context.commit('SET_IS_PLAYING', true);
      context.commit('SET_WHO_PLAYING', 1);
      context.commit('SET_RESULT_TITLE', '');
      const cards = await context.dispatch('drawCards', 4);
      context.commit('SET_PLAYER_ONE_CARDS', [cards[0], cards[2]]);
      context.commit('SET_PLAYER_TWO_CARDS', [cards[1], cards[3]]);
    },
    async initDeck(context) {
      const newDeck = (await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')).data;
      context.commit('SET_DECK_ID', newDeck.deck_id);
    },
    async drawCards({state}, count = 1) {
      let rawDrawnCards = (await axios.get('https://deckofcardsapi.com/api/deck/' + state.deckId + '/draw/?count=' + count)).data;
      let drawnCards = [];

      for(let i = 0; i < rawDrawnCards.cards.length; i++) {
        const rawDrawnCard = rawDrawnCards.cards[i];
        let weight = 0;

        if(rawDrawnCard.value === 'JACK' || rawDrawnCard.value === 'QUEEN' || rawDrawnCard.value === 'KING') {
          weight = 10;
        } else if (rawDrawnCard.value === 'ACE') {
          weight = 11;
        } else {
          weight = rawDrawnCard.value;
        }

        drawnCards.push({weight, image: rawDrawnCard.image});
      }
      return drawnCards;
    }
  },
  getters: {}
});