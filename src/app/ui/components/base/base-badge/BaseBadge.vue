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
        <button
          class="base-badge__unfold"
          @click="handleClick({ code, link })"
        ></button>
      </li>
    </ul>
  </article>
</template>

<script setup>
const prop = defineProps({
  code: {
    type: String,
    default: null,
    required: true,
  },
  properties: {
    type: Object,
    default: () => {},
    required: true,
  },
  link: {
    type: String,
    default: null,
  },
});

const clickEmit = defineEmits(['handleClick']);
const handleClick = ({ code, link }) =>
  clickEmit('handleClick', { code, link });
</script>

<style lang="scss" src="./BaseBadge.scss" />
