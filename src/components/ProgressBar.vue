<script setup>
import { ref } from 'vue'

const hidden = ref(true)

const start = () => {
  hidden.value = false
}
const finish = () => {
  console.log('finish')
}
</script>
<template>
  <div
    :class="{ hidden: hidden }"
    :style="{ width: '0%' }"
  ></div>
</template>
