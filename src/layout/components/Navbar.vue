<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="../../assets/logo.svg" class="user-avatar">
          <svg-icon icon-class="arrow-down" />
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>
                Home
              </el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/Jiangdedong/vue3-admin-template">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import { computed } from 'vue'
import { useAppStore } from '@/pinia/modules/app'
import { useRouter } from 'vue-router'

const $router = useRouter()

const appStore = useAppStore()

const sidebar = computed(() => {
  return appStore.sidebar
})
const toggleSideBar = () => [
  appStore.toggleSidebar()
]

const logout = () => {
  //退出
  $router.push('/login')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
