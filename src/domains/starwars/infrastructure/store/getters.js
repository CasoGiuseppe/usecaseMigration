import { getObjectProperty } from '../helpers';
export const GET_QUERY_BY_PATH = 'getQueryByPath';
export const GET_TABLE_CODE_BY_VALUE = 'getTableCodeByValue';
export const GET_ROWS_DROPDOWN_EXPAND_STATE = 'getRowsDropdownExpandState';

export default {
  [GET_QUERY_BY_PATH]: state => ({ path }) => getObjectProperty(state || {}, path) || '',
  [GET_TABLE_CODE_BY_VALUE]: (state, getters) => ({
    path,
    filterKey = 'codeModel',
    actionKey = 'expand',
    code,
  }) => {
    return getters[GET_QUERY_BY_PATH]({ path })?.find(node => node[filterKey] === code)[actionKey];
  },
  [GET_ROWS_DROPDOWN_EXPAND_STATE]: (state, getters) => ({
    path,
    filterKey = 'expand',
    state = true,
  }) => {
    const getTableItem = getters[GET_QUERY_BY_PATH]({ path });
    return getTableItem ? getTableItem.filter(node => node[filterKey] === state).length > 0 : false;
  },
};
