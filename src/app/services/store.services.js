export default {
  /**
   * call correct store action
   * @param {object} $store - store entity
   * @param {string} $actionName - a name of store action to call
   * @param {object} params - action payload
   * @returns {null}
   */
  handleStoreAction: async ({
    $store = {},
    $actionName = null,
    params = {},
  }) => {
    if (Object.keys($store).length === 0) throw new Error('Store is required');
    if (!$actionName) throw new Error('Action name is required');
    $store[$actionName](params);
  },
};
