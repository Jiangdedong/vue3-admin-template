<!--
 * @Description  : 分页组件
 * @Author       : 尾巴钓鱼的喵 1308242265@qq.com
 * @LastEditors  : 尾巴钓鱼的喵 1308242265@qq.com
 * @LastEditTime : 2024-09-05 10:42:33
-->
<template>
  <div class="flex items-center" :class="positionClassName[props.position]">
    <el-pagination
      :background="background"
      :total="total"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[5, 10, 20, 30, 50]"
      :layout="layout"
      :small="small"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script setup name="Pagination">

const props = defineProps({
  position: {
    type: String,
    default: 'right'
  },
  total: {
    type: Number,
    default: 0
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  small: {
    type: Boolean,
  }
});

const positionClassName = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end'
}

const currentPage = defineModel('currentPage', { default: 1 });
const pageSize = defineModel('pageSize', { default: 10 });

const emits = defineEmits(['pagination', 'update:currentPage', 'update:pageSize']);
const handleSizeChange = (val) => {
  emits('update:pageSize', val);
  emits('pagination');
};

const handleCurrentChange = (val) => {
  emits("update:currentPage", val);
  emits("pagination");
};
</script>