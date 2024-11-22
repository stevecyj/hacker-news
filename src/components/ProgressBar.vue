<script setup>
import { ref } from 'vue'

const hidden = ref(true)
const percent = ref(0)

const start = () => {
  hidden.value = false
}
const finish = () => {
  console.log('finish')
  hidden.value = true
  percent.value = 100
}
</script>
<template>
  <div
    :class="{ hidden: hidden }"
    :style="{ width: `${percent}%` }"
  ></div>
</template>
