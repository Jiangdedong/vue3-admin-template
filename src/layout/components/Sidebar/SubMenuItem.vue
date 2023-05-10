<template>
  <el-sub-menu ref="subMenu" :index="props.routeInfo.name" teleported>
    <template #title>
      <svg-icon v-if="props.routeInfo.meta && props.routeInfo.meta.icon" :icon-class="props.routeInfo.meta.icon"/>
      <span>{{ props.routeInfo.meta && props.routeInfo.meta.title }}</span>
    </template>
    <slot />
  </el-sub-menu>
</template>

<script>
export default {
  name: 'SubMenuItem'
}
</script>

<script setup>
const props = defineProps({
  routeInfo: {
    default: function() {
      return {}
    },
    type: Object
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
