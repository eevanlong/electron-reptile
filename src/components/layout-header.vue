<script setup lang="ts">
// 窗口最小化
const minimizeWin = () => {};
</script>

<template>
  <div class="header">
    <div class="red"></div>
    <div class="yellow"></div>
    <div class="green"></div>
  </div>
</template>

<style scoped>
.header {
  border-radius: 7px 7px 0 0;
  -webkit-app-region: drag;
  height: 40px;
  /* background: #999; */
  border-bottom: 1px solid #dbdbdbb4;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.header > div {
  width: 13px;
  height: 13px;
  border-radius: 50%;
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
