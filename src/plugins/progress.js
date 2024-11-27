import { createApp } from 'vue'
import ProgressBar from '@/components/ProgressBar.vue'

export const progressBarPlugin = {
  install: (app) => {
    // 創建 progress bar 容器
    const progressBarContainer = document.createElement('div')
    progressBarContainer.id = 'progress-bar-container'
    document.body.appendChild(progressBarContainer)

    // 掛載 ProgressBar 組件
    const progressBarApp = createApp(ProgressBar)
    const progressBar = progressBarApp.mount('#progress-bar-container')

    // 將實例添加到全域屬性
    app.config.globalProperties.$bar = progressBar
  },
}
