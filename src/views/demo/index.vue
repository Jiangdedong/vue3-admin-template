<template>
  <div class="w-full h-full">
    <genaral-table
      :column="column"
      :data="tableData"
    />
  </div>
</template>

<script setup>
import GenaralTable from '@/components/GeneralTable/index.vue'
const column = [
  { label: 'Date', prop: 'date' },
  { label: 'Name', prop: 'name' },
  { label: 'State', prop: 'state' },
  { label: 'City', prop: 'city' },
  { label: 'Address', prop: 'address' },
  { label: 'ZIP', prop: 'zip' },
  { label: 'Tag', prop: 'tag' },
  { label: 'Action', prop: 'action' },
]
const tableData = ref([])
for (let i = 0; i < 100; i++) {
  tableData.value.push({
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  })
}
</script>
