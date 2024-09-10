<template>
  <el-form :model="params" :label-width="props.labelWidth" inline class="bg-white" >
    <el-form-item v-for="field in props.fields" :key="field.key" :label="field.label" class="m-0px! p-10px">
      <el-input
        v-if="field.type === 'input'"
        v-model="params[field.key]"
        clearable
        :placeholder="field.placeholder"
        :style="{ width: field.width }"
      />
      <el-select
        v-if="field.type === 'select'"
        v-model="params[field.key]"
        clearable
        :placeholder="field.placeholder"
        :style="{ width: field.width }"
      >
        <el-option
          v-for="opt in field.options"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        />
      </el-select>
      <!-- <date-picker
        v-if="field.type === 'daterange'"
        v-model:value="params[field.key]"
        :style="{ width: field.width }"
      /> -->
    </el-form-item>
    <el-form-item class="m-0px! p-10px">
      <el-button type="primary" @click="emits('search')">查询</el-button>
      <el-button type="info" @click="emits('reset')">重置</el-button>
      <slot name="option" />
    </el-form-item>
  </el-form>
</template>

<script setup name="SearchForm">
// import DatePicker from '../DatePicker/index.vue'
const props = defineProps({
  fields: {
    type: Array,
    default: () => []
  },
  labelWidth: {
    type: String,
    default: 'auto'
  }
})
const params = defineModel('params')

const emits = defineEmits(['search', 'reset'])
</script>