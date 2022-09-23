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
import { GENERIC_ERROR } from '@/app/partials/messages';
// usecases
import { UseGetTableContent } from '@/domains/starwars/core';

// store
import { useHeroesStore } from '@/domains/starwars/infrastructure/store';
import { CHANGE_HEROES_LIST } from '@/domains/starwars/infrastructure/store/actions';
import { GET_HEROES_LIST } from '@/domains/starwars/infrastructure/store/getters';
import { storeToRefs } from 'pinia';

// test pina
const heroesStore = useHeroesStore();
const heroesRefs = storeToRefs(heroesStore);
const heroesList = heroesRefs[GET_HEROES_LIST];

onMounted(async () => {
  try {
    // test use case
    await UseGetTableContent({
      url: `${API_NAMESPACE}people`,
      onErrorState: {
        state: true,
        type: 'error',
        message: GENERIC_ERROR,
      },
      onInfoState: {
        message: 'info',
      },
      $store: heroesStore,
      $actionName: {
        tableContent: CHANGE_HEROES_LIST,
      },
    });
  } catch (e) {}
});
</script>
