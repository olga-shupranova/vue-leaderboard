<script setup lang="ts">

import { computed, onUnmounted, ref } from 'vue';
import { createUpdatableStorage } from '@/storage';
import SortableTable from '@/components/SortableTable.vue';
import type { StorageData } from '@/types';
import ProgressBar from '@/components/ProgressBar.vue';
import { BOARD_CONFIG, DEFAULT_SORT } from '@/pages/leaderboad-page/board-config';

const storage = createUpdatableStorage();
const leaderboardData = ref<StorageData>([]);
const unsubscribe = storage.subscribe(data => leaderboardData.value = data);

const filterValue = ref('');
const displayedEntries = computed<StorageData>(() =>
  filterValue.value
      ? leaderboardData.value.filter((record) => record.player.toLowerCase().includes(filterValue.value.toLowerCase()))
      : leaderboardData.value
);

onUnmounted(() => unsubscribe());

</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-5">
      <div class="text-xl font-bold text-gray-800">Leaderboard</div>
      <input id="search" v-model="filterValue" class="block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
             placeholder="Search player">
    </div>
    <SortableTable :records="displayedEntries" :configs="BOARD_CONFIG" :defaultSort="DEFAULT_SORT">
      <template #trend="{value}">
        <div class="flex items-center justify-center">
          {{ value }}
          <img v-if="value > 0" class="h-2.5 w-2.5 ml-1" src="./icons/triangle-top.svg" alt="asc" />
          <img v-else-if="value < 0" class="h-2.5 w-2.5 ml-1" src="./icons/triangle-bottom.svg" alt="desc" />
        </div>
      </template>
      <template #points="{value}">
        +{{ value }}
      </template>
      <template #progress="{value}">
        <ProgressBar
            :valueClass="value < 50 ? 'bg-green-600' : value < 90 ? 'bg-yellow-500' : 'bg-red-600'"
            :value="value"
        />
      </template>
    </SortableTable>
  </section>

</template>
