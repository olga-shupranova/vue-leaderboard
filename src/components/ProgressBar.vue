<script setup lang="ts">

import { computed } from 'vue';

const props = withDefaults(defineProps<{
  valueClass?: string,
  max?: number,
  value?: number
}>(), {
  valueClass: 'bg-blue-600',
  max: 100,
  value: 0
});

const progressValue = computed(() => {
  const maxWidthPercentage = 100;
  const width = (props.value * maxWidthPercentage) / props.max;

  return (width > maxWidthPercentage) ? maxWidthPercentage : width;
});

</script>

<template>
  <div class="w-full bg-gray-200 rounded-full h-1">
    <div :class="'rounded-full h-1 ' + valueClass" :style="{ width: progressValue + '%' }" />
  </div>
</template>

<style scoped>

</style>
