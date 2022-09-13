import Vue from 'vue';
export default {
  /**
   * handle error notify
   * @param {array} args - all needed parameters that method can receive
   * @returns {void}
   */
  hasError: (...args) => {
    Vue.prototype.$Notification.error(...Object.values(...args));
  },

  hasInfo: (...args) => {
    Vue.prototype.$Notification.info(...Object.values(...args));
  },
};
