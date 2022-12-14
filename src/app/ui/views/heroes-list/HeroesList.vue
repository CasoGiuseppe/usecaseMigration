<template>
  <section class="heroes-list">
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
            :code="hero['name']"
            :properties="filterRow(hero).rest"
            :content="heroeContent({ code: `${hero['name']}` })"
            :link="filterRow(hero).detail"
            @handle-click="handleTableContent.loadContent"
          >
            <template #properties="{ property }">{{
              Object.values(property).toString()
            }}</template>
            <template
              v-if="heroeContent({ code: hero['name'] })"
              #dropdown="{ content }"
            >
              {{ Object.values(content).toString() }}
            </template>
          </BaseBadge>
        </li>
      </template>
    </transition-group>
    <footer class="heroes-list__footer">
      <ul class="heroes-list__footer__list">
        <li>
          <BaseButton
            id="prev"
            :is-disabled="heroesLinks({ type: 'prev' }) === 'null'"
            @handle-click="setEndpoint"
          >
            {{ PREV_PAGE }}</BaseButton
          >
        </li>
        <li>
          <BaseButton
            id="next"
            :is-disabled="heroesLinks({ type: 'next' }) === 'null'"
            @handle-click="setEndpoint"
          >
            {{ NEXT_PAGE }}
          </BaseButton>
        </li>
      </ul>
    </footer>
  </section>
</template>
<script setup>
import { computed, ref, watch } from 'vue';

// constants
import { GENERIC_ERROR, NO_ITEMS } from '@/app/partials/messages';
import { NEXT_PAGE, PREV_PAGE } from '@/app/partials/labels';

// usecases
import {
  UseGetTableContent,
  UseTableBehaviours,
} from '@/domains/starwars/core';

// store
import { useHeroesStore } from '@/domains/starwars/infrastructure/store';
import {
  CHANGE_HEROES_LIST,
  CHANGE_HEROES_LINKS,
  CHANGE_HEROE_DETAIL,
} from '@/domains/starwars/infrastructure/store/actions';
import {
  GET_HEROES_LIST,
  GET_HEROES_LINKS,
  GET_HEROE_CONTENT,
} from '@/domains/starwars/infrastructure/store/getters';
import { storeToRefs } from 'pinia';

// components
import BaseBadge from '@/app/ui/components/base/base-badge/BaseBadge.vue';
import BaseButton from '@/app/ui/components/base/base-button/BaseButton.vue';

// pina
const heroesStore = useHeroesStore();
const heroesRefs = storeToRefs(heroesStore);
const heroesList = heroesRefs[GET_HEROES_LIST];
const heroesLinks = computed(() => heroesStore[GET_HEROES_LINKS]);
const heroeContent = computed(() => heroesStore[GET_HEROE_CONTENT]);

const filterRow = (row) => {
  // eslint-disable-next-line no-unused-vars
  const { detail, content, ...rest } = row;
  return { detail, rest };
};

// set new endpoint to launch API call
const endpoint = ref(null);
const setEndpoint = (id) =>
  (endpoint.value = heroesStore[GET_HEROES_LINKS]({ type: id }));

// handle table behaviours
const handleTableContent = {
  loadContent: async ({ code, link: url }) => {
    // check if heroe has dropdown content
    const hasContent = heroesStore[GET_HEROE_CONTENT]({ code });
    if (hasContent) {
      heroesStore[CHANGE_HEROE_DETAIL]({ code, attach: null });
      return;
    }

    const { handleLoadContent, handleAttachContent } = UseTableBehaviours();
    const attachHeroe = await handleLoadContent({
      url,
      onErrorState: {
        state: true,
        type: 'error',
        message: GENERIC_ERROR,
      },
    });

    // heroe hasn't content
    if (!attachHeroe) return;

    handleAttachContent({
      code,
      attach: attachHeroe,
      $store: heroesStore,
      $actionName: CHANGE_HEROE_DETAIL,
    });
  },
};

// detect endpoint value change and launch API call
watch(endpoint, async (url) => {
  try {
    // test use case
    await UseGetTableContent({
      url: url,
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
});
</script>
<style lang="scss" src="./HeroesList.scss" />
