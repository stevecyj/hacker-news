import { describe, it, expect, vi } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'

import ItemList from '@/views/ItemList.vue'
import NewsItem from '@/components/NewsItem.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { fetchListData } from '@/api/__mocks__/api'

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

  it('calls start on progressBar after mount', async () => {
    const startSpy = vi.fn()
    const wrapper = mount(ItemList, {
      global: {
        stubs: {
          ProgressBar: {
            template: '<div class="progress-bar"></div>',
            methods: {
              start: startSpy,
            },
          },
        },
      },
    })
    await wrapper.vm.$nextTick()
    expect(startSpy).toHaveBeenCalledTimes(1)
  })

  it('fetches data from api', async () => {
    expect.assertions(1)
    const data = await fetchListData()
    expect(data).toEqual([])
  })
})
