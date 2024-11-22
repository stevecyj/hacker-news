import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import NewsItem from '@/components/NewsItem.vue'

describe('NewsItem', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(NewsItem)
    expect(wrapper.exists()).toBe(true)
  })

  it.skip('renders item url', () => {
    const item = { url: 'https://example.com' }
    const wrapper = shallowMount(NewsItem, {
      props: { item },
    })
    expect(wrapper.find('a').attributes('href')).toBe(item.url)
  })

  it('renders a link to the item.url with item.title as text', () => {
    const item = { url: 'https://example.com', title: 'Example' }
    const wrapper = shallowMount(NewsItem, {
      props: { item },
    })
    expect(wrapper.find('a').attributes('href')).toBe(item.url)
    expect(wrapper.find('a').text()).toBe(item.title)
  })
})
