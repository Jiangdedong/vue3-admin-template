<!--
 * @Description  : 通用表格组件
 * @Author       : 尾巴钓鱼的喵 1308242265@qq.com
 * @LastEditors  : 尾巴钓鱼的喵 1308242265@qq.com
 * @LastEditTime : 2024-09-05 15:38:36
-->
<template>
  <el-table ref="tableRef" :data="tableData" v-bind="$attrs" class="w-full">
    <el-table-column v-for="item in props.column" :key="item.prop" :prop="item.prop" :label="item.label" :min-width="item.minWidth" />
  </el-table>
</template>

<script setup>
import request from '@/utils/request'
const tableRef = ref(null)
const props = defineProps({
  column: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  },
  api: {
    type: string,
    default: ''
  },
  apiType: {
    type: string,
    default: 'post'
  },
})
const tableData = computed(() => props.data)

const params = defineModel('params', {})

watch(() => props.api, (val) => {
  if (val) {
    request[props.apiType](val, params.value).then(res => {
      tableData.value = res.data
    })
  }

})
</script>