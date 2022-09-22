export const GET_LOADER_STATE = 'getLoaderState';
export default {
  [GET_LOADER_STATE]: (state) => state.hasLoader.state,
};
