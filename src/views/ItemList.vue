<script setup>
import { ref, onMounted } from 'vue'
import NewsItem from '@/components/NewsItem.vue'

const displayItems = window.items
</script>
<template>
  <div class="item-list">
    <NewsItem v-for="item in displayItems" :key="item.id"></NewsItem>
  </div>
</template>
<style scoped></style>
