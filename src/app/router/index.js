import { createRouter, createWebHistory } from 'vue-router';
import { storeToRefs } from 'pinia';

// constants
import { API_NAMESPACE, BASE_ENDPOINT } from '@/app/partials/constants';
import { GENERIC_ERROR, NO_ITEMS } from '@/app/partials/messages';

// store
import { useHeroesStore } from '@/domains/starwars/infrastructure/store';
import {
  CHANGE_HEROES_LIST,
  CHANGE_HEROES_LINKS,
} from '@/domains/starwars/infrastructure/store/actions';
import { GET_HEROES_LIST } from '@/domains/starwars/infrastructure/store/getters';

// usecases
import { UseGetTableContent } from '@/domains/starwars/core';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HeroesList',
      components: {
        default: () => import('@/app/ui/views/heroes-list/HeroesList.vue'),
      },

      beforeEnter: async (to, from, next) => {
        const heroesStore = useHeroesStore();
        const heroesRefs = storeToRefs(heroesStore);
        if (heroesRefs[GET_HEROES_LIST].length !== 0) {
          try {
            // test use case
            await UseGetTableContent({
              url: `${API_NAMESPACE}${BASE_ENDPOINT}`,
              onErrorState: {
                state: true,
                type: 'error',
                message: GENERIC_ERROR,
              },
              onInfoState: {
                state: true,
                type: 'info',
                message: NO_ITEMS,
              },
              $store: heroesStore,
              $actionName: {
                tableContent: CHANGE_HEROES_LIST,
                links: CHANGE_HEROES_LINKS,
              },
            });
          } catch (e) {}
        }

        next();
      },
    },
  ],
});

export default router;
