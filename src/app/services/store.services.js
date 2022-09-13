export default {
  /**
   * check if module store ire registered
   * check if module exist in $store, it could be better use hasModule method
   * that exist from Vuex 3.2
   * @param {object} $store - store entity
   * @param {string} moduleName - a name of store module
   * @returns {boolean} - node module exist value
   */
  getStoreModuleExist: ({ $store = {}, $moduleName = 'module' }) => {
    if (Object.keys($store).length === 0) throw new Error('Store is required');
    return $store.state[$moduleName] !== undefined;
  },
  /**
   * register a module in store
   * @param {object} $store - store entity
   * @param {string} $moduleName - a name for store module
   * @param {object} config - store config
   * @returns {null}
   */
  setNewStoreModule: async ({ $store = {}, $moduleName = 'module', config = {} }) => {
    if (Object.keys($store).length === 0) throw new Error('Store is required');
    await $store.registerModule($moduleName, config);
    return $store;
  },
  /**
   * remove module from store
   * @param {object} $store - store entity
   * @param {string} $moduleName - a name of store module
   * @returns {null}
   */
  unregisterStoreModule: async ({ $store = {}, $moduleName = 'module' }) => {
    if (Object.keys($store).length === 0) throw new Error('Store is required');
    await $store.unregisterModule($moduleName);
  },

  /**
   * call correct store action
   * @param {object} $store - store entity
   * @param {string} $moduleName - a name of store module
   * @param {string} $actionName - a name of store action to call
   * @param {object} params - action payload
   * @returns {null}
   */
  handleStoreAction: async ({ $store = {}, $moduleName, $actionName = null, params = {} }) => {
    if (Object.keys($store).length === 0) throw new Error('Store is required');
    if (!$actionName) throw new Error('Action name is required');
    $store.dispatch(`${$moduleName}/${$actionName}`, params);
  },
};
