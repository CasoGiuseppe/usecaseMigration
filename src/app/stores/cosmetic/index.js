import { defineStore } from 'pinia';
import { BASE_COSMETIC_STORE } from '@/app/partials/constants';

// actions
import { CHANGE_LOADER_STATE } from './actions';

export const useCosmeticStore = defineStore({
  id: 'cosmetic',
  state: () => BASE_COSMETIC_STORE,

  actions: {
    [CHANGE_LOADER_STATE]({ state = false }) {
      this.hasLoader.state = state;
    },
  },
});
