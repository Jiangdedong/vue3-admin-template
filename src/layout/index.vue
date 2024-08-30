<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device ==='mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <Sidebar class="sidebar-container" />
    <div :class="{'hasTagsView': needTagsView}" class="main-container">
      <div :class="{'fixed-header': fixedHeader}">
        <Navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<script setup>
import RightPanel from '@/components/RightPanel/index.vue'
import TagsView from './components/TagsView.vue'
import Settings from './components/Settings.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import { computed, onMounted, watch, onBeforeMount, onUnmounted } from 'vue'
import { useAppStore } from '@/pinia/modules/app'
import { useSettingsStore } from '@/pinia/modules/settings'
import { useRoute } from 'vue-router'

const { body } = document
const WIDTH = 992
const route = useRoute()

const appStore = useAppStore()
const useSettings = useSettingsStore()

const sidebar = computed(() => {
  return appStore.sidebar
})

const device = computed(() => {
  return appStore.device
})

const fixedHeader = computed(() => {
  return useSettings.settings.fixedHeader
})

const needTagsView = computed(() => {
  return useSettings.settings.tagsView
})

const showSettings = computed(() => {
  return useSettings.settings.showSettings
})


const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === 'mobile'
  }
})

const handleClickOutside = () => {
  appStore.closeSidebar(false)
}

const $_isMobile = () => {
  const rect = body.getBoundingClientRect()
  return rect.width - 1 < WIDTH
}
const $_resizeHandler = () => {
  if (!document.hidden) {
    const isMobile = $_isMobile()
    appStore.toggleDevice(isMobile ? 'mobile' : 'desktop')

    if (isMobile) {
      appStore.closeSidebar(true)
    }
  }
}
watch(() => route,
  () => {
    if (device.value === 'mobile' && sidebar.value.opened) {
      appStore.closeSidebar(false)
    }
  },
  { immediate: true, deep: true }
)
onBeforeMount(() => {
  window.addEventListener('resize', $_resizeHandler)
})
onUnmounted(() => {
  window.removeEventListener('resize', $_resizeHandler)
})
onMounted(() => {
  const isMobile = $_isMobile()
  if (isMobile) {
    appStore.toggleDevice('mobile')
    appStore.closeSidebar(true)
  }
})

</script>

<style lang="scss" scoped>
  @import "@/styles/variables.scss";

  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    
    &:after {
      content: "";
      display: table;
      clear: both;
    }

    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }
  .hasTagsView .fixed-header+.app-main {
    padding-top: 84px;
    min-height: 100vh;
  }

  .fixed-header+.app-main {
    padding-top: 50px;
    min-height: 100vh;
  }

  .hasTagsView .app-main {
    min-height: calc(100vh - 84px);
  }
  .mobile .fixed-header {
    width: 100%;
  }
</style>
