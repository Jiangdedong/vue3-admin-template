<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1-2" type="success">
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-alert>
  </div>
</template>
