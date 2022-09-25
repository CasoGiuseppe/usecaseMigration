<template>
  <article class="base-badge">
    <ul class="base-badge__list">
      <li
        v-for="(value, key) in properties"
        :key="value"
        :data-label="`${key}:`"
      >
        <slot :property="{ value }" name="properties" />
      </li>
      <li v-if="link" class="base-badge--is-action">
        <button class="base-badge__unfold"></button>
      </li>
    </ul>
  </article>
</template>

<script setup>
const prop = defineProps({
  properties: {
    type: Object,
    default: () => {},
  },
  link: {
    type: String,
    default: null,
  },
});
</script>

<style lang="scss" src="./BaseBadge.scss" />
