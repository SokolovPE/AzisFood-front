import CatalogService from '../../services/catalog.service';

const state = {
    categories: [],
    goodsInCategory: [],
    currentCategory: {
        id: 0,
        title: ''
    },
    editsInProgress: []
};

const getters = {
    getCategories: state => {
        return state.categories;
    },
    getCategoriesWithoutCnt: state => {
        return state.categories.map(category => ({
            title: category.title,
            id: category.id
        }));
    },
    getGoodsInCurrentCat: state => {
        return state.goodsInCategory;
    },
    getCurrentCategory: state => {
        return state.currentCategory;
    },
    getCurrentCategoryWithoutCnt: state => {
        return {
            title: state.currentCategory.title,
            id: state.currentCategory.id
        };
    },
    getEditsInProgress: state => state.editsInProgress
};

const mutations = {
    SET_CATS(state, payload) {
        state.categories = payload;
    },
    ADD_CAT(state, payload) {
        state.categories.push(payload);
    },
    // REMOVE_CAT(state, payload) {
    //     state.categories = state.categories.filter(cat => cat != payload);
    // },
    // UPDATE_CAT(state, payload) {
    //     state.categories = state.categories.map(cat =>
    //         cat.id == payload.id ? payload : cat
    //     );
    // },
    SET_CURRENT_CAT(state, payload) {
        state.currentCategory = payload;
    },
    SET_GOODS_IN_CAT(state, payload) {
        state.goodsInCategory = payload;
    },
    SET_CNT_IN_CAT(state, payload) {
        let catToUpd = state.categories.find(
            cat => cat.id == payload.categoryId
        );
        if (payload.replace) {
            catToUpd.goodCnt = payload.count;
        } else {
            catToUpd.goodCnt += payload.count;
        }
    },
    ADD_GOOD(state, payload) {
        state.goodsInCategory.push(payload);
    },
    REMOVE_GOOD(state, payload) {
        state.goodsInCategory = state.goodsInCategory.filter(
            good => good.id != payload.id
        );
    },
    REMOVE_GOOD_BY_ID(state, payload) {
        state.goodsInCategory = state.goodsInCategory.filter(
            good => good.id != payload
        );
    },
    UPDATE_GOOD(state, payload) {
        state.goodsInCategory = state.goodsInCategory.map(good =>
            good.id == payload.id ? payload : good
        );
    },
    SET_EDIT_PROGRESS(state, payload) {
        state.editsInProgress = payload;
    },
    ADD_EDIT_PROGRESS(state, payload) {
        let editInProgress = state.editsInProgress.find(
            edit => edit.goodId == payload.goodId && edit.value == payload.value
        );
        if (!editInProgress) {
            state.editsInProgress.push(payload);
        }
    },
    UPDATE_EDIT_PROGRESS(state, payload) {
        state.editsInProgress = state.editsProgress.map(edit =>
            edit.goodId == payload.goodId ? payload : edit
        );
    },
    REMOVE_EDIT_PROGRESS(state, payload) {
        state.editsInProgress = state.editsInProgress.filter(
            edit => edit.goodId != payload.goodId
        );
    }
};

const actions = {
    fetchCats: async ({ commit, getters }) => {
        await CatalogService.getCategoriesWithCnt().then(response => {
            commit('SET_CATS', response.data);
            let newCurrentCat = getters.getCategories[0] || null;
            commit('SET_CURRENT_CAT', newCurrentCat);
        });
    },
    addCat: async ({ commit }, title) => {
        await CatalogService.createCategory({ title: title }).then(response => {
            if (response.status == 201) {
                let cat = response.data;
                cat.goodCnt = 0;
                commit('ADD_CAT', cat);
            }
        });
    },
    selectCat: ({ commit, dispatch }, payload) => {
        commit('SET_CURRENT_CAT', payload);
        dispatch('fetchGoodsInCurrentCat');
    },
    fetchGoodsInCurrentCat: async ({ commit, getters }) => {
        let categoryId = getters.getCurrentCategory.id;
        await CatalogService.getGoodsInCategory(categoryId).then(response => {
            commit('SET_GOODS_IN_CAT', response.data);
            commit('SET_CNT_IN_CAT', {
                categoryId: categoryId,
                count: response.data.length,
                replace: true
            });
        });
    },
    updateGood: async ({ commit }, payload) => {
        await CatalogService.updateGood(payload.id, payload)
            .then(() => {
                commit('UPDATE_GOOD', payload);
            })
            .catch(error => {
                console.error(`Error during updating a good: ${error}`);
            });
    },
    addGood: async ({ commit }, payload) => {
        await CatalogService.createGood(payload).then(result => {
            if (result.status == 201) {
                commit('ADD_GOOD', result.data);
                commit('SET_CNT_IN_CAT', {
                    categoryId: result.data.category.id,
                    count: 1,
                    replace: false
                });
            }
        });
    },
    removeGoodById: async ({ commit }, payload) => {
        await CatalogService.deleteGood(payload).then(() => {
            commit('REMOVE_GOOD_BY_ID', payload);
        });
    },
    setGoodCntInCat: async ({ commit }, payload) => {
        await CatalogService.getGoodCntInCategory(payload).then(response => {
            commit('SET_CNT_IN_CAT', {
                categoryId: payload,
                count: response.data,
                replace: true
            });
        });
    },
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
    modifyEditInProgress: ({ commit }, payload) => {
        if (payload.value) {
            commit('ADD_EDIT_PROGRESS', payload);
        } else {
            commit('REMOVE_EDIT_PROGRESS', payload);
        }
    },
    clearEditsInProgress: ({ commit }) => {
        commit('SET_EDIT_PROGRESS', []);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
};
