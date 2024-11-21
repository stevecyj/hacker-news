import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import NewsItem from '@/components/NewsItem.vue'

describe('NewsItem', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(NewsItem)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders item url', () => {
    const item = { url: 'https://example.com' }
    const wrapper = shallowMount(NewsItem, {
      props: { item },
    })
    expect(wrapper.find('a').attributes('href')).toBe(item.url)
  })
})
