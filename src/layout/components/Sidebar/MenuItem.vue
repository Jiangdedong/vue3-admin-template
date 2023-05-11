<template>
  <el-menu-item v-if="!isExternal(route.path)" :index="route.path" :route="route">
    <svg-icon v-if="route.meta && route.meta.icon" :icon-class="route.meta.icon"/>
    <template #title>{{ route.meta && route.meta.title }}</template >
  </el-menu-item>
  <el-menu-item v-else @click="openLink(route.path)">
    <svg-icon v-if="route.meta && route.meta.icon" :icon-class="route.meta.icon"/>
    <template #title>{{ route.meta && route.meta.title }}</template >
  </el-menu-item>
</template>

<script>
export default {
  name: 'MenuItem'
}
</script>

<script setup>
import { isExternal } from "@/utils/validate"
import { computed } from 'vue'

const props = defineProps({
  routeInfo: {
    default: function() {
      return {}
    },
    type: Object
  }
})

const openLink = (href) => {
  window.open(href)
}

const route = computed(() => {
  if (props.routeInfo.children && props.routeInfo.children.length) {
    return props.routeInfo.children[0]
  } else {
    return props.routeInfo
  }
})
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
