<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import NewsItem from '@/components/NewsItem.vue'
import ProgressBar from '@/components/ProgressBar.vue'

const displayItems = window.items
const progressBar = ref(null)

onMounted(() => {
  if (progressBar.value && typeof progressBar.value.start === 'function') {
    progressBar.value.start()
  }
})
</script>
<template>
  <ProgressBar ref="progressBar" />
  <div class="item-list">
    <NewsItem
      v-for="item in displayItems"
      :key="item.id"
      :item="item"
    ></NewsItem>
  </div>
</template>
<style scoped></style>
