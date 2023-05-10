import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTagsViewStore  = defineStore('tagsView', () => {
  const visitedViews = ref([])
  const cachedViews = ref([])

  const addVisitedView = (view) => {
    if (visitedViews.value.some(v => v.path === view.path)) return
    visitedViews.value.push(
      Object.assign({}, view, {
        title: view.meta.title || '我的首页'
      })
    )
  }
  const addCachedView = (view) => {
    if (cachedViews.value.includes(view.name)) return
    if (!view.meta.noCache) {
      cachedViews.value.push(view.name)
    }
  }

  const addView = (view) => {
    addVisitedView(view)
    addCachedView(view)
  }

  const delVisitedView = (view) => {
    return new Promise(resolve => {
      for (const [i, v] of visitedViews.value.entries()) {
        if (v.path === view.path) {
          visitedViews.value.splice(i, 1)
          break
        }
      }
      resolve([...visitedViews.value])
    })
  }
  const delCachedView = (view) => {
    return new Promise(resolve => {
      for (const i of cachedViews.value) {
        if (i === view.name) {
          const index = cachedViews.value.indexOf(i)
          cachedViews.value.splice(index, 1)
          break
        }
      }
      resolve([...cachedViews.value])
    })
  }

  const delView = (view) => {
    return new Promise(resolve => {
      delVisitedView(view)
      delCachedView(view)
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }

  
  const delOthersVisitedViews = (view) => {
    return new Promise(resolve => {
      for (const [i, v] of visitedViews.value.entries()) {
        if (v.path === view.path) {
          visitedViews.value = visitedViews.value.slice(i, i + 1)
          break
        }
      }
      resolve([...visitedViews.value])
    })
  }

  const delOthersCachedViews = (view) => {
    return new Promise(resolve => {
      for (const i of cachedViews.value) {
        if (i === view.name) {
          const index = cachedViews.value.indexOf(i)
          cachedViews.value = cachedViews.value.slice(index, index + 1)
          break
        }
      }
      resolve([...cachedViews.value])
    })
  }

  const delOthersViews = (view) => {
    return new Promise(resolve => {
      delOthersVisitedViews(view)
      delOthersCachedViews(view)
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }
  
  const delAllVisitedViews = () => {
    return new Promise(resolve => {
      visitedViews.value = []
      resolve([...visitedViews.value])
    })
  }
  const delAllCachedViews = () => {
    return new Promise(resolve => {
      cachedViews.value = []
      resolve([...cachedViews.value])
    })
  }
  const delAllViews = (view) => {
    return new Promise(resolve => {
      delAllVisitedViews(view)
      delAllCachedViews(view)
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }

  const updateVisitedView = (view) => {
    for (let v of visitedViews.value) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }

  return {
    visitedViews,
    cachedViews,
    addView,
    delView,
    delOthersViews,
    delAllViews,
    delCachedView,
    updateVisitedView
  }
})
