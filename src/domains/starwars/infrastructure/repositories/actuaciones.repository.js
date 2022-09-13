import HTTP from '@/app/services/http.service';
/**
 * get service from an specific endpoint
 * @param {string} url - endpoint URL
 * @returns {void}
 */
export const getAPI = async (url, params = {}) => {
  if (!url) throw new Error('Url param is required');
  return await HTTP.get(url, params);
};
