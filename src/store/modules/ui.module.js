const state = {
    showDrawer: true
};

const getters = {
    getDrawerState: state => state.showDrawer
};

const mutations = {
    SET_DRAWER_STATE(state, payload) {
        state.showDrawer = payload;
    },
    TOGGLE_DRAWER_STATE(state) {
        state.showDrawer = !state.showDrawer;
    }
};

const actions = {
    setDrawerState: ({ commit }, payload) => {
        commit('SET_DRAWER_STATE', payload);
    },
    toggleDrawer: ({ commit }) => {
        commit('TOGGLE_DRAWER_STATE');
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
};
