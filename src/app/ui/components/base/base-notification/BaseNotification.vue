<template>
  <dialog
    :class="['notification', type ? `notification--is-${type}` : null]"
    ref="dialog"
  >
    <button class="notification__close" @click="closeModal" />
    <slot name="message" />
  </dialog>
</template>
<script setup>
import { ref, watch, computed } from 'vue';

const dialog = ref(null);
const prop = defineProps({
  state: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: null,
    validator: (type) => ['error', 'info'].includes(type),
  },
});

const emit = defineEmits(['close']);
const stateValue = computed(() => prop.state);

// method to close dialog an launch emit to do action
const closeModal = () => emit('close');

// check state change to open/close modal
watch(stateValue, (value) =>
  value === true ? dialog.value.showModal() : dialog.value.close()
);
</script>
<style lang="scss" src="./BaseNotification.scss" />
