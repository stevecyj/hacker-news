import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import NewsItem from '@/components/NewsItem.vue'

describe('NewsItem', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(NewsItem)
    expect(wrapper.exists()).toBe(true)
  })
})
