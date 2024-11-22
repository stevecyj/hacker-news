import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ProgressBar from '@/components/ProgressBar.vue'

describe('ProgressBar.vue', () => {
  it('is hidden on initial render', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.classes()).toContain('hidden')
  })

  it('initializes with 0% width', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.element.style.width).toBe('0%')
  })

  it('shows the bar when start is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    await wrapper.vm.start()
    expect(wrapper.classes()).not.toContain('hidden')
  })
})
