<template>
  <section :class="[isLoading ? 'is-loading is-blocked' : null, 'root-layout']">
    <RouterView />
  </section>
</template>

<script setup>
import { RouterView } from 'vue-router';

// store
import { useCosmeticStore } from '../../stores/cosmetic';
import { GET_LOADER_STATE } from '../../stores/cosmetic/getters';
import { storeToRefs } from 'pinia';

// cosmetic pina
const cosmeticStore = useCosmeticStore();
const cosmeticRefs = storeToRefs(cosmeticStore);
const isLoading = cosmeticRefs[GET_LOADER_STATE];

console.log(isLoading);
</script>
<style lang="scss" src="@/assets/styles/index.scss" />
