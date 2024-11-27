<script setup>
import { ref } from 'vue'

const hidden = ref(true)
const percent = ref(0)
const timer = ref(null)

const start = () => {
  hidden.value = false
  percent.value = 0
  timer.value = setInterval(() => {
    percent.value++
  }, 100)
}
const finish = () => {
  hidden.value = true
  percent.value = 100
  clearInterval(timer.value)
}

defineExpose({
  start,
  finish,
})
</script>
<template>
  <div
    :class="{ hidden: hidden }"
    :style="{ width: `${percent}%` }"
  ></div>
</template>
