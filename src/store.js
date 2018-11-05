import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sacha: {
      position: {}
    },
    environment: [],
  },
  actions: {
    getEnvironment({ commit }) {
      const environment = new Array(18).fill([]).map((array, row) =>
        new Array(20).fill([]).map((array, column) => ({
          type: 'floor',
          canWalk: true,
          row,
          column,
        })),
      );
      environment[1][9].type = 'wall';
      environment[1][9].canWalk = false;

      commit('SET_ENVIRONMENT', environment);
      return environment;
    },
  },
  mutations: {
    SET_ENVIRONMENT(state, environment) {
      Vue.set(state, 'environment', environment);
    },
    DECREASE_SACHA_POKEMON_HP(state, amount) {
      let newHp = state.sacha.pokemon.hp - amount;
      state.sacha.pokemon.hp = newHp < 0 ? 0 : newHp;
    },
    DECREASE_ENEMY_POKEMON_HP(state, amount) {
      let newHp = state.enemy.pokemon.hp - amount;
      state.enemy.pokemon.hp = newHp < 0 ? 0 : newHp;
    },
    RESTORE_SACHA_POKEMON_HP(state) {
      state.sacha.pokemon.hp = 10;
    },
    RESTORE_ENEMY_POKEMON_HP(state) {
      state.enemy.pokemon.hp = 10;
    }
  },
});
