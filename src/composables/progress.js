import { ref } from 'vue'

export function createProgress() {
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

  return {
    hidden,
    percent,
    start,
    finish,
  }
}
