<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        ref="tagRef"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
        @click.middle="closeSelectedTag(tag)"
        @contextmenu.prevent="openMenu(tag,$event)"
      >
        {{ tag.title }}
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{'left': $left + 'px', 'top': $top + 'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<script setup>
import ScrollPane from '@/components/ScrollPane/index.vue'
import { computed, ref, watch, nextTick, getCurrentInstance } from 'vue'
import { useTagsViewStore } from '@/pinia/modules/tagsView'

import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const $router = useRouter()

const tagsViewStore = useTagsViewStore()
const vm = getCurrentInstance()

const visible = ref(false)
// const count = ref(0)
const $top = ref(0)
const $left = ref(0)
const selectedTag = ref(null)

const tagRef = ref(null)
const scrollPaneRef = ref(null)

const addViewTags = () => {
  const { name, path } = $route
  // this.count++;
  // if(this.count!=1){
  if (name || path === '/dashboard') {
    tagsViewStore.addView($route)
  }
  // }
  return false
}

const moveToCurrentTag = () => {
  nextTick(() => {
    for (const tag of tagRef.value) {
      if (tag.to.path === $route.path) {
        scrollPaneRef.value.moveToTarget(tag)
        if (tag.to.fullPath !== $route.fullPath) {
          tagsViewStore.updateVisitedView($route)
        }
        break
      }
    }
  })
}

const isActive = (route) => {
  return route.path === $route.path
}

const refreshSelectedTag = (view) => {
  tagsViewStore.delCachedView(view).then(() => {
    const { fullPath } = view
    nextTick(() => {
      $router.replace({
        path: fullPath
      })
    })
  })
}

const closeSelectedTag = (view) => {
  tagsViewStore.delView(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        $router.push(latestView)
      } else {
        $router.push('/')
      }
    }
  })
}

const closeOthersTags = () => {
  $router.push(selectedTag)
  tagsViewStore.delOthersViews(selectedTag).then(() => {
    moveToCurrentTag()
  })
}

const closeAllTags = () => {
  tagsViewStore.delAllViews()
  $router.push('/')
}

const openMenu = (tag, e) => {
  const menuMinWidth = 105
  const $el = vm.ctx.$el
  const offsetLeft = $el.getBoundingClientRect().left // container margin left
  const offsetWidth = $el.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const left = e.clientX - offsetLeft + 15 // 15: margin right

  if (left > maxLeft) {
    $left.value = maxLeft
  } else {
    $left.value = left
  }
  $top.value = e.clientY

  visible.value = true
  selectedTag.value = tag
}

const closeMenu = () => {
  visible.value = false
}

const handleScroll = () => {
  closeMenu()
}

const visitedViews = computed(() => {
  return tagsViewStore.visitedViews
})

watch(() => $route,
  () => {
    addViewTags()
    moveToCurrentTag()
  },
  { immediate: true, deep: true }
)

watch(visible,(newValue, oldValue) => {
    console.log(oldValue)
    if (newValue) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  }
)
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 20px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 14px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #66b1ff;
        color: #fff;
        border-color: #66b1ff;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
