import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import ItemList from '@/views/ItemList.vue'
import NewsItem from '@/components/NewsItem.vue'

describe('ItemList', () => {
  it('renders an Item for each item in window.items', () => {
    const items = [{}, {}, {}]
    window.items = items
    const wrapper = shallowMount(ItemList)
    const newsItems = wrapper.findAllComponents(NewsItem)
    expect(newsItems).toHaveLength(items.length)

    newsItems.forEach((newsItem, index) => {
      expect(newsItem.props('item')).toBe(items[index])
    })
  })
})
