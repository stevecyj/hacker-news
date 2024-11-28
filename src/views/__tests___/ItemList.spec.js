import { describe, it, expect, vi } from 'vitest'
import { shallowMount, mount, flushPromises } from '@vue/test-utils'
import ItemList from '@/views/ItemList.vue'
import NewsItem from '@/components/NewsItem.vue'
import * as api from '@/api/__mocks__/api'

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
    const wrapper = shallowMount(ItemList, {
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
    const fetchListDataSpy = vi.spyOn(api, 'fetchListData')
    const data = await fetchListDataSpy()
    expect(data).toEqual([])
  })

  it('awaits promise', async () => {
    expect.assertions(1)
    let hasResolved = false
    Promise.resolve().then(() => {
      hasResolved = true
    })
    await flushPromises()
    expect(hasResolved).toBe(true)
  })

  it('renders an item with data for each item', async () => {
    expect.assertions(4)
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    // const startSpy = vi.fn()
    // const finishSpy = vi.fn()
    const fetchListDataSpy = vi.spyOn(api, 'fetchListData')
    fetchListDataSpy.mockResolvedValueOnce(items)
    const wrapper = shallowMount(ItemList)

    await flushPromises()
    console.log('spy calls:', fetchListDataSpy.mock.calls)
    expect(fetchListDataSpy).toHaveBeenCalledTimes(1)

    const newsItems = wrapper.findAllComponents(NewsItem)
    expect(newsItems).toHaveLength(items.length)

    newsItems.forEach((newsItem, index) => {
      // console.log('newsItem >>> ', newsItem)
      expect(wrapper.vm.displayItems[index]).toEqual(items[index])
    })
  })

  it('calls finish on progressBar after fetch', async () => {
    expect.assertions(1)
    const startSpy = vi.fn()
    const finishSpy = vi.fn()
    shallowMount(ItemList, {
      global: {
        stubs: {
          ProgressBar: {
            methods: { start: startSpy, finish: finishSpy },
          },
        },
      },
    })
    await flushPromises()

    expect(finishSpy).toHaveBeenCalledTimes(1)
  })
})
