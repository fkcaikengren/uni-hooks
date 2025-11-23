import { createSSRApp } from 'vue'
import App from './App.vue'

import DemoDialog from './components/demo-dialog/index.vue'
import VhpButton from "./components/button/index.vue";
import VhpInput from "./components/input/index.vue";
import NavItem from "./components/nav-item/index.vue";

export function createApp() {
  const app = createSSRApp(App);
  // 全局注册组件
  app
    .component("vhp-button", VhpButton)
    .component("vhp-input", VhpInput)
    .component("demo-dialog", DemoDialog)
    .component("nav-item", NavItem);
  return {
    app,
  };
}


