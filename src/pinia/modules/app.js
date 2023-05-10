// eslint-disable-next-line no-unused-vars
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const sidebar = ref({
    opened: window.localStorage.getItem('sidebarStatus') ? !!+window.localStorage.getItem('sidebarStatus') : true,
    withoutAnimation: false
  })

  const device = ref('desktop')
  
  const fixedHeader = ref(true)

  const toggleSidebar = () => {
    sidebar.value.opened = !sidebar.value.opened
    sidebar.value.withoutAnimation = false
    if (sidebar.value.opened) {
      window.localStorage.setItem('sidebarStatus', 1)
    } else {
      window.localStorage.setItem('sidebarStatus', 0)
    }
  }

  const closeSidebar = (withoutAnimation) => {
    window.localStorage.setItem('sidebarStatus', 0)
    sidebar.value.opened = false
    sidebar.value.withoutAnimation = withoutAnimation
  }

  const toggleDevice = (val) => {
    device.value = val
  }

  return {
    sidebar,
    device,
    fixedHeader,
    toggleSidebar,
    closeSidebar,
    toggleDevice
  }
})