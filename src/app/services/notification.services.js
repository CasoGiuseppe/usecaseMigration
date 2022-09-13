export default {
  /**
   * handle error notify
   * @param {array} args - all needed parameters that method can receive
   * @returns {void}
   */
  hasError: (...args) => {
    const { message } = args;
    alert(`it's an error: ${message}`);
  },

  hasInfo: (...args) => {
    const { message } = args;
    alert(`it's an info: ${message}`);
  },
};
