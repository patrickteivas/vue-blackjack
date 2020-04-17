import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import playerModel from '../utils/playerModel';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    deckId: null,
    isPlaying: false,
    players: [],
    whoseTurn: 1,
    resultTitle: ''
  },
  mutations: {
    SET_DECK_ID(state, payload) {
      state.deckId = payload;
    },
    SET_IS_PLAYING(state, payload) {
      state.isPlaying = payload;
    },
    ADD_CARD_TO_PLAYER(state, payload) {
      const player = state.players.find(player => player.id === payload.id);
      player.cards.push(...payload.card);
    },
    SET_PLAYERS(state, payload) {
      state.players = payload;
    },
    SET_WHOSE_TURN(state, payload) {
      state.whoseTurn = payload;
    },
    SET_RESULT_TITLE(state, payload) {
      state.resultTitle = payload;
    }
  },
  actions: {
    async startGame(context) {
      await context.dispatch('initDeck');
      context.commit('SET_WHOSE_TURN', 1);
      context.commit('SET_RESULT_TITLE', '');
      context.commit('SET_PLAYERS', []);

      const cards = await context.dispatch('drawCards', 4);
      context.dispatch('createPlayer', {id: 1, cards: [cards[0], cards[2]]}); // Hardcoded 2 players
      context.dispatch('createPlayer', {id: 2, cards: [cards[1], cards[3]]});
      context.dispatch('updatePlayerScore', 1);
      context.dispatch('updatePlayerScore', 2);
      context.commit('SET_IS_PLAYING', true);
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
    },
    createPlayer({state}, playerInfo) {
      let player = JSON.parse(JSON.stringify({...playerModel, ...playerInfo})); // Native JS object copying
      state.players.push(player);
    },
    updatePlayerScore({state}, id) {
      const player = state.players.find(player => player.id === id);
      let score = 0;
      player.cards.forEach(card => score += parseInt(card.weight));
      player.score = score;
    }
  },
  getters: {}
});