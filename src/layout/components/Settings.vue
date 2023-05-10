<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">系统布局配置</h3>
      <div class="drawer-item">
        <span>开启 Tags-View</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>固定 Header</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/pinia/modules/settings'

const useSettings = useSettingsStore()

const tagsView = computed({
  get: () => useSettings.settings.tagsView,
  set: (val) => {
    useSettings.changeSetting({
      key: 'tagsView',
      value: val
    })
  }
})

const fixedHeader = computed({
  get: () => useSettings.settings.fixedHeader,
  set: (val) => {
    useSettings.changeSetting({
      key: 'fixedHeader',
      value: val
    })
  }
})
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>