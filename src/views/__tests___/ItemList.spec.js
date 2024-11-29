import { describe, it, expect, vi } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import ItemList from '@/views/ItemList.vue'
import NewsItem from '@/components/NewsItem.vue'
import { fetchListData } from '@/api/api'

vi.mock('@/api/api')

describe('ItemList', () => {
  it('renders an Item for each item (in window.items)', async () => {
    expect.assertions(4)
    // const items = [{}, {}, {}]
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    // window.items = items
    fetchListData.mockResolvedValueOnce(items)
    const wrapper = shallowMount(ItemList)
    await flushPromises()
    const newsItems = wrapper.findAllComponents(NewsItem)
    expect(newsItems).toHaveLength(items.length)

    newsItems.forEach((newsItem, index) => {
      expect(newsItem.props('item')).toStrictEqual(items[index])
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
    const data = await fetchListData()
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
