<template>
  <section class="heroes-list">
    <h1>Heroe list</h1>
    <transition-group
      appear
      tag="ul"
      name="appear-teams-item"
      class="heroes-list__table"
    >
      <template v-if="heroesList.length > 0">
        <li
          v-for="(hero, index) in heroesList"
          :key="hero['name']"
          :style="{
            transitionDelay: `${index} * 0.1s`,
          }"
          class="heroes-list__row"
        >
          <BaseBadge
            :properties="filterRow(hero).rest"
            :link="filterRow(hero).detail"
          >
            <template #properties="{ property }">{{
              Object.values(property).toString()
            }}</template>
          </BaseBadge>
        </li>
      </template>
    </transition-group>
  </section>
</template>
<script setup>
import { onMounted } from 'vue';

// constants
import { API_NAMESPACE } from '@/app/partials/constants';
import { GENERIC_ERROR, NO_ITEMS } from '@/app/partials/messages';

// usecases
import { UseGetTableContent } from '@/domains/starwars/core';

// store
import { useHeroesStore } from '@/domains/starwars/infrastructure/store';
import { CHANGE_HEROES_LIST } from '@/domains/starwars/infrastructure/store/actions';
import { GET_HEROES_LIST } from '@/domains/starwars/infrastructure/store/getters';
import { storeToRefs } from 'pinia';

// components
import BaseBadge from '@/app/ui/components/base/base-badge/BaseBadge.vue';

// pina
const heroesStore = useHeroesStore();
const heroesRefs = storeToRefs(heroesStore);
const heroesList = heroesRefs[GET_HEROES_LIST];

const filterRow = (row) => {
  const { detail, ...rest } = row;
  return { detail, rest };
};
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
        state: true,
        type: 'info',
        message: NO_ITEMS,
      },
      $store: heroesStore,
      $actionName: {
        tableContent: CHANGE_HEROES_LIST,
      },
    });
  } catch (e) {}
});
</script>
<style lang="scss" src="./HeroesList.scss" />
