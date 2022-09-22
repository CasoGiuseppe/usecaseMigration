// store
import { useCosmeticStore } from '../stores/cosmetic';
import { CHANGE_LOADER_STATE } from '../stores/cosmetic/actions';

const cosmeticStore = useCosmeticStore();
export default {
  /**
   * handle error notify
   * @param {array} args - all needed parameters that method can receive
   * @returns {void}
   */
  hasError: ({ state = false, message }) => {
    alert(`it's an error: ${message}`);
  },

  hasInfo: ({ state = false, message }) => {
    alert(`it's an info: ${message}`);
  },

  hasLoader: ({ state = false }) => {
    cosmeticStore[CHANGE_LOADER_STATE]({ state });
  },
};
