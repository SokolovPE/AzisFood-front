import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';

import todo from './modules/todo';
import goods from './modules/goods';

Vue.use(Vuex, VueAxios, axios);

export const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        todo,
        goods
    }
});
