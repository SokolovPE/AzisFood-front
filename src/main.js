import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueMq from 'vue-mq';
import VeeValidate from 'vee-validate';

import { BTabs, BTab, BFormSelect, BFormSelectOption } from 'bootstrap-vue';
import { routes } from './routes';
import { store } from './store/store';

//* Fonts and icons
import '@/assets/argon-design-system-free/assets/css/argon-design-system.css';

//* Install BootstrapVue
Vue.component('BTabs', BTabs);
Vue.component('BTab', BTab);
Vue.component('BFormSelect', BFormSelect);
Vue.component('BFormSelectOption', BFormSelectOption);
//* Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin);

//* Scripts.
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(VeeValidate);

//* Media queries.
Vue.use(VueMq, {
    breakpoints: {
        mobile: 550,
        tablet: 900,
        laptop: 1250,
        desktop: Infinity
    }
});

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        //* If position on page was saved by browser then scroll user back to that position.
        if (savedPosition) {
            return savedPosition;
        }
        //* If we have hash in url with element id, then navigate to that element.
        if (to.hash) {
            return {
                selector: to.hash //,
                // behavior: 'smooth' //* For a smooth scrolling.
            };
        }
        //* In all other cases scroll to top.
        return { x: 0, y: 0 };
    }
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
