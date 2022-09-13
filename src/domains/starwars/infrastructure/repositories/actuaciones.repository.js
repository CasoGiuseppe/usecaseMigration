import Vue from 'vue';
/**
 * get service from an specific endpoint
 * @param {string} url - endpoint URL
 * @returns {void}
 */
export const getEndpointDTO = async (url, params = {}) => {
  if (!url) throw new Error('Url param is required');
  return await Vue.prototype.$APIService.get(url, params);
};
