import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(),
    createSvgIconsPlugin({
      // eslint-disable-next-line no-undef
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        // 指定symbolId格式
      symbolId: 'icon-[name]',
      customDomId: '__svg__icons__dom__',
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
