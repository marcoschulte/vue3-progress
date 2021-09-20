import {Vue3ProgressPlugin} from '@marcoschulte/vue3-progress';
import {createApp} from 'vue';
import App from './App.vue';

createApp(App)
  .use(Vue3ProgressPlugin)
  .mount('#app');
