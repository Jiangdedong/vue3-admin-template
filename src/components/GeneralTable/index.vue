<!--
 * @Description  : 通用表格组件
 * @Author       : 尾巴钓鱼的喵 1308242265@qq.com
 * @LastEditors  : 尾巴钓鱼的喵 1308242265@qq.com
 * @LastEditTime : 2024-09-10 18:39:55
-->
<template>
  <div class="w-full bg-white px-10px">
    <el-table ref="tableRef" :data="tableData" border class="w-full" :height="props.height">
      <template v-for="item in props.columns" :key="item.label">
        <el-table-column
          v-if="item.type !== 'operate'"
          show-overflow-tooltip
          :label="item.label"
          :min-width="item.minWidth"
        >
          <template #default="scope">
            <template v-if="item.render">
              <component :is="item.render(scope)" />
            </template>
            <template v-else>
              {{ scope.row[item.prop] }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          fixed="right"
          header-align="center"
          align="center"
          :label="item.label"
          :min-width="item.minWidth"
        >
          <template #default="{ row }">
            <el-button
              v-for="opt in item.options"
              :key="opt.label"
              :type="opt.type"
              size="small"
              @click="opt.click(row)">
              {{ opt.label}}
            </el-button>
          </template>
        </el-table-column>
      </template>
      <slot />
    </el-table>

    <Pagination
      v-if="props.pagination"
      :total="total"
      v-model:current-page="params.page"
      v-model:page-size="params.page_size"
      @pagination="getData"
    />
  </div>
</template>

<script setup>
import Pagination from '@/components/Pagination/index.vue'
import request from '@/utils/request'
import { ElLoading } from 'element-plus'
import { ref } from 'vue'
const tableRef = ref(null)
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  },
  api: {
    type: String,
    default: ''
  },
  apiType: {
    type: String,
    default: 'post'
  },
  pagination: {
    type: Boolean,
    default: true
  },
  height: {
    type: [Number, String],
    default: 300
  },
})
const tableData = ref([])
const total = ref(0)

const params = defineModel('params')

watch(() => props.api, () => {
  getData()
})

function getData() {
  const loading = ElLoading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  request[props.apiType](props.api, params.value).then(res => {
    tableData.value = res.data.list
    total.value = res.data.total
    loading.close()
  })
}

onMounted(() => {
  getData()
})

defineExpose({
  getData
})
</script>