<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key='key' />
      </transition>
    </router-view>
  </section>
</template>


<script>
export default {
  name: 'AppMain'
}
</script>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const $route = useRoute()

const key = computed(() => {
  return $route.path
})
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden auto;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
