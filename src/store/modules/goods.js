import axios from 'axios';

const dbUrl = 'https://vue-http-f059c.firebaseio.com';
const goodsUrl = `${dbUrl}/goods.json`;
const categoriesUrl = `${dbUrl}/cats.json`;

const state = {
    categories: [],
    goods: []
};

const getters = {
    getCategories: state => {
        return state.categories;
    },
    getGoods: state => {
        return state.goods;
    }
};

const mutations = {
    SET_CATS(state, payload) {
        state.categories = payload;
    },
    ADD_CAT(state, payload) {
        state.categories.push(payload);
    },
    REMOVE_CAT(state, payload) {
        state.categories = state.categories.filter(cat => cat != payload);
    },
    UPDATE_CAT(state, payload) {
        state.categories = state.categories.map(cat =>
            cat.id == payload.id ? payload : cat
        );
    },
    SET_GOODS(state, payload) {
        state.goods = payload;
    },
    ADD_GOOD(state, payload) {
        state.goods.push(payload);
    },
    REMOVE_GOOD(state, payload) {
        state.goods = state.goods.filter(good => good != payload);
    },
    UPDATE_GOOD(state, payload) {
        state.goods = state.goods.map(good =>
            good.id == payload.id ? payload : good
        );
    }
};

const actions = {
    fetchCats: async ({ commit }) => {
        let { data } = await axios.get(categoriesUrl);
        let processed = Object.keys(data).map(catKey => {
            let tempData = data[catKey];
            tempData.id = catKey;
            return tempData;
        });
        commit('SET_CATS', processed);
    },
    setCats: ({ commit }, payload) => {
        axios
            .put(categoriesUrl, payload)
            .then(response => {
                console.log(response);
                console.log('PUT was performed successfull!');
                commit('SET_CATS', payload);
            })
            .catch(error => {
                console.log(`Error during PUT ${error}`);
            });
    },
    addCat: async ({ commit }, title) => {
        let newCat = { id: null, title: title };
        await axios.post(categoriesUrl, newCat).then(result => {
            if (result.status == 200) {
                newCat.id = result.data.name;
                commit('ADD_CAT', newCat);
            }
        });
    },
    updateCat: async ({ commit }, payload) => {
        await axios
            .patch(
                `${categoriesUrl.replace('.json', '')}/${payload.id}.json`,
                payload
            )
            .then(() => {
                commit('UPDATE_CAT', payload);
            })
            .catch(error => {
                console.error(`Error during updating cat: ${error}`);
            });
    },
    removeCat: ({ commit }, payload) => {
        axios
            .delete(`${categoriesUrl.replace('.json', '')}/${payload.id}.json`)
            .then(() => {
                commit('REMOVE_CAT', payload);
            });
    },
    fetchGoods: async ({ commit }) => {
        let { data } = await axios.get(goodsUrl);
        let processed = Object.keys(data).map(goodKey => {
            let tempData = data[goodKey];
            tempData.id = goodKey;
            return tempData;
        });
        commit('SET_GOODS', processed);
    },
    setGoods: ({ commit }, payload) => {
        axios
            .put(goodsUrl, payload)
            .then(response => {
                console.log(response);
                console.log('PUT was performed successfull!');
                commit('SET_GOODS', payload);
            })
            .catch(error => {
                console.log(`Error during PUT ${error}`);
            });
    },
    updateGood: async ({ commit }, payload) => {
        await axios
            .patch(
                `${goodsUrl.replace('.json', '')}/${payload.id}.json`,
                payload
            )
            .then(() => {
                commit('UPDATE_GOOD', payload);
            })
            .catch(error => {
                console.error(`Error during updating a good: ${error}`);
            });
    },
    addGood: async ({ commit }, payload) => {
        await axios.post(goodsUrl, payload).then(result => {
            if (result.status == 200) {
                payload.id = result.data.name;
                commit('ADD_GOOD', payload);
            }
        });
    }
    // updateCat: async ({ commit }, payload) => {
    //     await axios
    //         .patch(
    //             `${categoriesUrl.replace('.json', '')}/${payload.id}.json`,
    //             payload
    //         )
    //         .then(() => {
    //             commit('UPDATE_CAT', payload);
    //         })
    //         .catch(error => {
    //             console.error(`Error during updating cat: ${error}`);
    //         });
    // },
    // removeCat: ({ commit }, payload) => {
    //     axios
    //         .delete(`${categoriesUrl.replace('.json', '')}/${payload.id}.json`)
    //         .then(() => {
    //             commit('REMOVE_CAT', payload);
    //         });
    // }
};

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
};
