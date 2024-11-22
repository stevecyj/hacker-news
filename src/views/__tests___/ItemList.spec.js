import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import ItemList from '@/views/ItemList.vue'
import NewsItem from '@/components/NewsItem.vue'

describe('ItemList', () => {
  it('renders an Item for each item in window.items', () => {
    const items = [{}, {}, {}]
    window.items = items
    const wrapper = shallowMount(ItemList)
    expect(wrapper.findAllComponents(NewsItem).length).toBe(items.length)
  })
})
