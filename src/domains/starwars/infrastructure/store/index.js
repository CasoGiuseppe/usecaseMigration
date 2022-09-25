import { defineStore } from 'pinia';
import { BASE_HEROES_STORE } from '../partials/constants';

// actions
import { CHANGE_HEROES_LIST, CHANGE_HEROES_LINKS } from './actions';

// getters
import getters from './getters';

export const useHeroesStore = defineStore({
  id: 'heroes',
  state: () => BASE_HEROES_STORE,

  actions: {
    [CHANGE_HEROES_LIST](list) {
      this.heroes = list;
    },
    [CHANGE_HEROES_LINKS](links) {
      this.links = links;
    },
  },

  getters,
});
