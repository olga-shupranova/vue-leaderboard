<script setup lang="ts">

import type { BoardRecord, ColumnConfig, CurrentSort, StorageData } from '@/types';
import { SortOrder } from '@/types';
import { computed, ref } from 'vue';
import { sortBy } from '@/helpers/helpers';

const props = defineProps<{
  records: StorageData,
  configs: ColumnConfig[],
  defaultSort: CurrentSort,
}>();

const currentSort = ref<CurrentSort>(props.defaultSort);

function sortColumn(key: keyof BoardRecord) {
  currentSort.value = {
    key,
    order: (key === currentSort.value.key && currentSort.value.order === SortOrder.Asc) ? SortOrder.Desc : SortOrder.Asc
  };
}

const sortedRecords = computed<StorageData>(() => {
  return sortBy(props.records, currentSort.value.key, currentSort.value.order === SortOrder.Desc);
});

</script>

<template>
  <table class="table-auto w-full text-sm text-left text-gray-500">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th v-for="config in configs" :key="config.key" class="px-6 py-3">
          <template v-if="!config.sortable">
            {{ config.name }}
          </template>
          <button v-else @click="sortColumn(config.key)" class="group relative flex items-center uppercase">
            {{ config.name }}
            <template v-if="config.key === currentSort.key">
              <span v-if="currentSort.order === SortOrder.Asc" class="ml-1 text-base"> ↑ </span>
              <span v-else class="ml-1 text-base"> ↓ </span>
            </template>
            <span v-else class="ml-1 text-base absolute right-[-18px] hidden group-hover:block"> ↑↓ </span>
          </button>
        </th>
      </tr>
    </thead>
    <TransitionGroup tag="tbody" name="row">
      <tr v-for="record in sortedRecords" :key="record.id" class="bg-white border-b">
        <td v-for="({ key, template }) in configs" :key="key" class="px-6 py-3.5">
          <slot v-if="template" :name="template" :value="record[key]"></slot>
          <span v-else>{{ record[key] }}</span>
        </td>
      </tr>
    </TransitionGroup>
  </table>
</template>

<style scoped>
.row-move, /* rows animation */
.row-enter-active,
.row-leave-active {
  transition: all 0.2s ease;
}

.row-enter-from,
.row-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
