<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui';
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <div class="app">
        <div class="container">
          <layout-header />
          <router-view />
        </div>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
.app {
  border-radius: 7px;
  background: hsla(0, 0%, 100%, 0.86);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.app .container {
  background: #f3f3f388;
}
</style>
