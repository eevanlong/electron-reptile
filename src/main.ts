import { createApp } from 'vue';
import App from './App.vue';
import './samples/node-api';

import router from './router';
import './styles/index.css';
// 通用字体
// import 'vfonts/Lato.css';
// // 等宽字体
// import 'vfonts/FiraCode.css';

createApp(App).use(router).mount('#app').$nextTick(window.removeLoading);
