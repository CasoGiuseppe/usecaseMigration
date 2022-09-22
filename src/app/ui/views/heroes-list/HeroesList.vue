<template>
  <section>
    <h1>Heroe list</h1>
    <p>{{ heroesList }}</p>
  </section>
</template>
<script setup>
// constants
import { onMounted } from 'vue';
// constants
import { API_NAMESPACE } from '@/app/partials/constants';

// usecases
import { UseGetTableContent } from '@/domains/starwars/core';

// store
import { useHeroesStore } from '@/domains/starwars/infrastructure/store';
import { CHANGE_HEROES_LIST } from '@/domains/starwars/infrastructure/store/actions';
import { GET_HEROES_LIST } from '@/domains/starwars/infrastructure/store/getters';
import { storeToRefs } from 'pinia';

// services
import notificationServices from '@/app/services/notification.services';

// test pina
const heroesStore = useHeroesStore();
const heroesRefs = storeToRefs(heroesStore);
const heroesList = heroesRefs[GET_HEROES_LIST];

// destructuring services
const { hasLoader } = notificationServices;

onMounted(async () => {
  try {
    // active loader
    hasLoader({ state: true });

    // test use case
    await UseGetTableContent({
      url: `${API_NAMESPACE}people`,
      onErrorState: {
        message: 'Error',
      },
      onInfoState: {
        message: 'info',
      },
      $store: heroesStore,
      $actionName: {
        tableContent: CHANGE_HEROES_LIST,
      },
    });
    // eslint-disable-next-line no-empty
  } catch (e) {
  } finally {
    // remove loader
    hasLoader({ state: false });
  }
});
</script>
