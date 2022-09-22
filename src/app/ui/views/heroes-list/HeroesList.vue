<template>
  <section>
    <h1>Heroe list</h1>
  </section>
</template>
<script setup>
// constants
import { onMounted } from 'vue';
// constants
import { API_NAMESPACE } from '@/app/partials/constants';

// usecases
import { UseGetTableContent } from '@/domains/starwars/core';

onMounted(async () => {
  console.log(await UseGetTableContent({ url: `${API_NAMESPACE}people` }));
});
</script>
