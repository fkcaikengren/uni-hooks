import { createSSRApp } from "vue";
import App from "./App.vue";


import DemoDialog from './components/demo-dialog/index.vue';


export function createApp() {
  const app = createSSRApp(App);
  app.component('demo-dialog', DemoDialog);
  return {
    app,
  };
}
