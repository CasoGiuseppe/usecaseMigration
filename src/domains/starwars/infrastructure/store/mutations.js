export const SET_ROOT_LINK = 'setRootLink';
export const SET_QUERY_VALUE = 'setQueryValue';
export const SET_TABLE_CONTENT = 'setTableContent';
export const SET_RESET_MODULE = 'setResetModule';
export const SET_EDIT_LANDING_VALUES = 'setEditLandingValues';
export const SET_SELECTED_ROW_DROPDOWN = 'setSelectedRowDropdown';
export const SET_ATTACH_CONTENT_DROPDOWN = 'setAttachContentDropdown';
export const SET_USER_CHOISE_VALUE = 'setUserChoiseValue';

export default {
  /**
   * @param {any} state
   * @param {object} node - new node to save in links key
   */
  [SET_ROOT_LINK](state, node) {
    state.root.links = { ...state.root.links, ...node };
  },

  /**
   * @param {any} state
   * @param {object} node - new node to save in links key
   */
  [SET_QUERY_VALUE](state, node) {
    state.main.endpointResponse = { ...state.main.endpointResponse, ...node };
  },

  /**
   * @param {any} state
   * @param {array} valueArray - array list
   */
  [SET_TABLE_CONTENT](state, valueArray) {
    state.main.HTML.table = valueArray;
  },

  /**
   * @param {any} state
   * @param {string} type - store node to use
   */
  [SET_RESET_MODULE](state, { type }) {
    state[type].endpointResponse = {};
    state[type].HTML.table = [];
  },

  /**
   * @param {any} state
   * @param {string} type - param to define values type
   * @param {object} value - object values
   */
  [SET_EDIT_LANDING_VALUES](state, { type, value }) {
    state.edit[type] = {
      ...state.edit[type],
      ...value,
    };
  },

  /**
   * @param {any} state
   * @param {string} code - value to filter table row
   * @param {string} filterKey - key to filter row keys
   * @param {string} actionKey - key to change
   */
  [SET_SELECTED_ROW_DROPDOWN](state, { code, filterKey, actionKey }) {
    // check if exist opened item
    // and item has not filterKey === code
    const toCLoseItem = state.edit.HTML.table.find(node => node[actionKey] === true);
    if (toCLoseItem && toCLoseItem[filterKey] !== code) {
      toCLoseItem[actionKey] = !toCLoseItem[actionKey];
    }
    const toOpenedItem = state.edit.HTML.table.find(node => node[filterKey] === code);
    toOpenedItem ? (toOpenedItem[actionKey] = !toOpenedItem[actionKey]) : null;
  },

  /**
   * @param {any} state
   * @param {string} code - value to filter table row
   * @param {string} filterKey - key to filter row keys
   * @param {string} keyContent - key to change
   * @param {object} attach - object with attach content structure
   */
  [SET_ATTACH_CONTENT_DROPDOWN](state, { code, filterKey, keyContent, attach }) {
    const filterRow = state.edit.HTML.table.find(node => node[filterKey] === code);
    filterRow ? (filterRow[keyContent] = attach) : null;
  },

  /**
   * @param {any} state
   * @param {string} root - root key name to filter
   * @param {string} key - key name to change
   * @param {any} value - new value to save
   */
  [SET_USER_CHOISE_VALUE](state, { root, key, value, mode }) {
    state[root].selectUserValues =
      mode === 'insert' ? { ...state[root].selectUserValues, ...{ [key]: value } } : {};
  },
};
