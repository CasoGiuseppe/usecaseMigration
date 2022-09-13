import getters, {
  GET_QUERY_BY_PATH,
  GET_TABLE_CODE_BY_VALUE,
  GET_ROWS_DROPDOWN_EXPAND_STATE,
} from './getters';
import mutations, {
  SET_ROOT_LINK,
  SET_QUERY_VALUE,
  SET_TABLE_CONTENT,
  SET_RESET_MODULE,
  SET_EDIT_LANDING_VALUES,
  SET_SELECTED_ROW_DROPDOWN,
  SET_ATTACH_CONTENT_DROPDOWN,
  SET_USER_CHOISE_VALUE,
} from './mutations';
import {
  CHANGE_ROOT_LINK,
  CHANGE_QUERY_VALUE,
  CHANGE_TABLE_CONTENT,
  RESET_MODULE,
  CHANGE_EDIT_LANDING_VALUES,
  CHANGE_SELECTED_ROW_DROPDOWN,
  CHANGE_ATTACH_CONTENT_DROPDOWN,
  CHANGE_USER_CHOISE_VALUE,
} from './actions';

export const actuacionesStoreConfig = {
  namespaced: true,
  state: {
    root: {
      links: {},
    },
    main: {
      endpointResponse: {},
      HTML: {
        table: [],
      },
    },
    edit: {
      HTML: {},
      endpointResponse: {},
      selectUserValues: {},
    },
  },
  mutations,
  actions: {
    [CHANGE_ROOT_LINK]({ commit }, node) {
      commit(SET_ROOT_LINK, node);
    },
    [CHANGE_QUERY_VALUE]({ commit }, node) {
      commit(SET_QUERY_VALUE, node);
    },
    [CHANGE_TABLE_CONTENT]({ commit }, valueArray) {
      commit(SET_TABLE_CONTENT, valueArray);
    },
    [RESET_MODULE]({ commit }, { type = 'main' }) {
      commit(SET_RESET_MODULE, { type });
    },
    [CHANGE_EDIT_LANDING_VALUES]({ commit }, { type = 'HTML', value = {} }) {
      commit(SET_EDIT_LANDING_VALUES, { type, value });
    },

    [CHANGE_SELECTED_ROW_DROPDOWN](
      { commit },
      { code, filterKey = 'codeModel', actionKey = 'expand', keyContent = 'dataExtensible' }
    ) {
      commit(SET_SELECTED_ROW_DROPDOWN, { code, filterKey, actionKey, keyContent });
    },

    [CHANGE_ATTACH_CONTENT_DROPDOWN](
      { commit },
      { code, filterKey = 'codeModel', keyContent = 'dataExtensible', attach }
    ) {
      commit(SET_ATTACH_CONTENT_DROPDOWN, { code, filterKey, keyContent, attach });
    },

    [CHANGE_USER_CHOISE_VALUE]({ commit }, { root = 'edit', key, value, mode = 'insert' }) {
      commit(SET_USER_CHOISE_VALUE, { root, key, value, mode });
    },
  },
  getters,
};
