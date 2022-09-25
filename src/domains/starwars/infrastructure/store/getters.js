export const GET_HEROES_LIST = 'getHeroesList';
export const GET_HEROES_LINKS = 'getHeroesLinks';
export default {
  [GET_HEROES_LIST]: (state) => state.heroes,
  [GET_HEROES_LINKS]: (state) => {
    return ({ type }) => {
      return encodeURI(state.links[type]) || undefined;
    };
  },
};
