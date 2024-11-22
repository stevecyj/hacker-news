import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ProgressBar from '@/components/ProgressBar.vue'

describe('ProgressBar.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
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

  it('sets the bar to 100% width when finish is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    await wrapper.vm.start()
    await wrapper.vm.finish()
    expect(wrapper.element.style.width).toBe('100%')
  })

  it('hides the bar when finish is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    await wrapper.vm.start()
    await wrapper.vm.finish()
    expect(wrapper.classes()).toContain('hidden')
  })

  it('resets to 0% width when start is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    await wrapper.vm.start()
    await wrapper.vm.finish()
    await wrapper.vm.start()
    expect(wrapper.element.style.width).toBe('0%')
  })

  it('increases width by 1% every 100ms after start call', async () => {
    const wrapper = shallowMount(ProgressBar)
    await wrapper.vm.start()
    vi.advanceTimersByTime(100)
    expect(wrapper.element.style.width).toBe('1%')
    vi.advanceTimersByTime(900)
    expect(wrapper.element.style.width).toBe('10%')
    vi.advanceTimersByTime(4000)
    expect(wrapper.element.style.width).toBe('50%')
  })
})
