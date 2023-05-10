<template>
  <component
    :is="menuComponent"
    v-if="!props.routeInfo.hidden"
    :is-collapse="isCollapse"
    :route-info="props.routeInfo"
  >
    <template v-if="props.routeInfo.children&&props.routeInfo.children.length">
      <sidebar-item
        v-for="item in props.routeInfo.children"
        :key="item.name"
        :is-collapse="false"
        :route-info="item"
      />
    </template>
  </component>
</template>

<script>

export default {
  name: 'SidebarItem'
}
</script>

<script setup>
import MenuItem from './MenuItem.vue'
import SubMenuItem from './SubMenuItem.vue'
import { computed } from 'vue'

const props = defineProps({
  routeInfo: {
    type: Object,
    default: function() {
      return {}
    },
    required: true
  },
  isCollapse: {
    type: Boolean,
    default: false
  }
})

const menuComponent = computed(() => {
  if (props.routeInfo.children && props.routeInfo.children.filter(item => !item.hidden).length > 1) {
    return SubMenuItem
  } else {
    return MenuItem
  }
})
</script>
