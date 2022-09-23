// store
import { createPinia } from 'pinia';
import { useCosmeticStore } from '../stores/cosmetic';
import {
  CHANGE_LOADER_STATE,
  CHANGE_NOTIFICATION_STATE,
} from '../stores/cosmetic/actions';

const store = createPinia();
const cosmeticStore = useCosmeticStore(store);
export default {
  /**
   * handle error notify
   * @param {array} args - all needed parameters that method can receive
   * @returns {void}
   */
  hasError: (...args) => {
    cosmeticStore[CHANGE_NOTIFICATION_STATE](...Object.values(args));
  },

  hasInfo: ({ state = false, type = null, message = null }) => {
    cosmeticStore[CHANGE_NOTIFICATION_STATE]({ state, type, message });
  },

  hasLoader: ({ state = false }) => {
    cosmeticStore[CHANGE_LOADER_STATE]({ state });
  },
};
