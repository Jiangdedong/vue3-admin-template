<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="$style.menuBg"
        :text-color="$style.menuText"
        :unique-opened="true"
        :active-text-color="$style.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        router
      >
        <sidebar-item v-for="route in routes" :key="route.path" :route-info="route" :is-collapse="isCollapse" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import { computed } from 'vue'
import { useAppStore } from '@/pinia/modules/app'
import { useRouter, useRoute } from 'vue-router'

const appStore = useAppStore()
const router = useRouter()
const route = useRoute()

const sidebar = computed(() => {
  return appStore.sidebar
})

const routes = computed(() => {
  return router.options.routes
})

const activeMenu = computed(() => {
  const pathArr = route.fullPath.split('/')
  const len = pathArr.length
  return pathArr[len - 1]
})

const showLogo = computed(() => {
  return true
})

const isCollapse = computed(() => {
  return !sidebar.value.opened
})
</script>

<style module lang="scss">
@import '@/styles/variables.scss';
</style>
