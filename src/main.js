import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';

import { store } from './store/store';

//* Fonts and icons
import '@/assets/argon-design-system-free/assets/css/argon-design-system.css';
import '@/assets/argon-design-system-free/assets/css/nucleo-icons.css';
//* Nucleo Icons
import '@/assets/argon-design-system-free/assets/css/nucleo-svg.css';
import '@/assets/argon-design-system-free/assets/css/font-awesome.css';

//* Scripts.
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
