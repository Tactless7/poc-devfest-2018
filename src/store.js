import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sacha: {
      position: {},
      pokemon: {
        hp: 10
      }
    },
    enemy: {
      pokemon: {
        hp: 10
      } 
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
    DECREASE_ENEMY_POKEMON_HP(state, amount) {
      let newHp = state.enemy.pokemon.hp - amount;
      state.enemy.pokemon.hp = newHp < 0 ? 0 : newHp;
    }
  },
});
