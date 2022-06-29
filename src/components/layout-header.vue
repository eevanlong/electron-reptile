<script setup lang="ts">
import { getCurrentWindow } from '@electron/remote';

// 关闭窗口
const closeWin = () => {
  getCurrentWindow().close();
};

// 窗口最小化
const minimizeWin = () => {
  getCurrentWindow().minimize();
};

// 窗口最大化
const maximizeWin = () => {
  // 判断 窗口是否已最大化
  if (getCurrentWindow().isMaximized()) {
    // 恢复原窗口大小
    return getCurrentWindow().unmaximize();
  }
  //最大化窗口
  getCurrentWindow().maximize();
};
</script>

<template>
  <div class="header">
    <div class="red" @click.stop="closeWin"></div>
    <div class="yellow" @click.stop="minimizeWin"></div>
    <div class="green" @click.stop="maximizeWin"></div>
  </div>
</template>

<style scoped>
.header {
  -webkit-app-region: drag;
  border-radius: 7px 7px 0 0;
  height: 40px;
  border-bottom: 1px solid #dbdbdbb4;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.header > div {
  -webkit-app-region: no-drag;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  cursor: pointer;
}

.header .red {
  background: #fe605c;
  margin-right: 10px;
}

.header .yellow {
  background: #febc44;
  margin-right: 10px;
}

.header .green {
  background: #00c94e;
}
</style>
