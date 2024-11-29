<script setup>
import { ref, onMounted } from 'vue'
import NewsItem from '@/components/NewsItem.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { fetchListData } from '@/api/api'

// const displayItems = window.items
const displayItems = ref([])
const progressBar = ref(null)

const loadItems = async () => {
  if (progressBar.value && typeof progressBar.value.start === 'function') {
    progressBar.value.start()
  }

  // const items = await fetchListData()
  // displayItems.value = items
  fetchListData()
    .then((items) => {
      displayItems.value = items
      if (progressBar.value && typeof progressBar.value.finish === 'function') {
        progressBar.value.finish()
      }
    })
    .catch(() => {
      if (progressBar.value && typeof progressBar.value.fail === 'function') {
        progressBar.value.fail()
      }
    })
}

onMounted(() => {
  loadItems()
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
