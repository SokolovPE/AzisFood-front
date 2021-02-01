import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';

import auth from './modules/auth.module';
import adminCatalog from './modules/adminCatalog.module';

Vue.use(Vuex, VueAxios, axios);

export const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        adminCatalog
    }
});
