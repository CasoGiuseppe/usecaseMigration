import { HTTPHeader } from '../partials/constants';

export default {
  get: async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      HTTPHeader,
    });
    return await response.json();
  },
};
