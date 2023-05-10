// eslint-disable-next-line no-unused-vars
import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {

  const settings = reactive({
    tagsView: true,
    fixedHeader: true,
    showSettings: true
  })

  const changeSetting = ({key, value}) => {
    settings[key] = value
  }

  return {
    settings,
    changeSetting
  }
})