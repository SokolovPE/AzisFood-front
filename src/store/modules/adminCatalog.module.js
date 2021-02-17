import AdminCatalogService from '@/modules/admin/catalog/services/adminCatalog.service';
import { GoodModel } from '@/modules/common/models/GoodModel';
const state = {
    categories: [],
    editorState: false,
    goodOnEdit: { ...GoodModel },
    goodsInCategory: [],
    currentCategory: {
        id: 0,
        title: ''
    }
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
    getEditorState: state => {
        return state.editorState;
    },
    getGoodOnEdit: state => {
        return state.goodOnEdit;
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
        state.categories = state.categories.filter(cat => cat.id !== payload);
    },
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
        if (!catToUpd) {
            return;
        }
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
    REMOVE_GOODS_BY_IDS(state, payload) {
        state.goodsInCategory = state.goodsInCategory.filter(
            good => !payload.includes(good.id)
        );
    },
    UPDATE_GOOD(state, payload) {
        state.goodsInCategory = state.goodsInCategory.map(good =>
            good.id == payload.id ? payload : good
        );
    },
    SET_EDITOR_STATE(state, payload) {
        state.editorState = payload;
    },
    SET_GOOD_ON_EDIT(state, payload) {
        state.goodOnEdit = payload;
    }
};

const actions = {
    fetchCats: async ({ commit, getters }) => {
        await AdminCatalogService.getCategoriesWithCnt().then(response => {
            commit('SET_CATS', response.data);
            let newCurrentCat = getters.getCategories[0] || null;
            commit('SET_CURRENT_CAT', newCurrentCat);
        });
    },
    addCat: async ({ commit }, title) => {
        return new Promise((resolve, reject) => {
            AdminCatalogService.createCategory({ title: title }).then(
                response => {
                    if (response.status == 201) {
                        let cat = response.data;
                        cat.goodCnt = 0;
                        commit('ADD_CAT', cat);
                        resolve(cat);
                    } else {
                        reject();
                    }
                }
            );
        });
    },
    selectCat: ({ commit, dispatch }, payload) => {
        commit('SET_CURRENT_CAT', payload);
        dispatch('fetchGoodsInCurrentCat');
    },
    fetchGoodsInCurrentCat: async ({ commit, getters }) => {
        let categoryId = getters.getCurrentCategory.id;
        await AdminCatalogService.getGoodsInCategory(categoryId).then(
            response => {
                commit('SET_GOODS_IN_CAT', response.data);
                commit('SET_CNT_IN_CAT', {
                    categoryId: categoryId,
                    count: response.data.length,
                    replace: true
                });
            }
        );
    },
    updateGood: async ({ commit }, payload) => {
        await AdminCatalogService.updateGood(payload.id, payload)
            .then(() => {
                commit('UPDATE_GOOD', payload);
            })
            .catch(error => {
                console.error(`Error during updating a good: ${error}`);
            });
    },
    addGood: async ({ commit }, payload) => {
        await AdminCatalogService.createGood(payload).then(result => {
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
        return new Promise(resolve => {
            AdminCatalogService.deleteGood(payload).then(response => {
                commit('REMOVE_GOOD_BY_ID', payload);
                resolve(response.data);
            });
        });
    },
    removeGoodsByIds: async ({ commit }, payload) => {
        return new Promise(resolve => {
            AdminCatalogService.deleteGoods(payload).then(response => {
                commit('REMOVE_GOODS_BY_IDS', payload);
                resolve(response.data);
            });
        });
    },
    setGoodCntInCat: async ({ commit }, payload) => {
        await AdminCatalogService.getGoodCntInCategory(payload).then(
            response => {
                commit('SET_CNT_IN_CAT', {
                    categoryId: payload,
                    count: response.data,
                    replace: true
                });
            }
        );
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
    removeCatById: async ({ commit }, payload) => {
        await AdminCatalogService.deleteCategory(payload).then(() => {
            commit('REMOVE_CAT', payload);
        });
    },
    setEditorState: ({ commit }, payload) => {
        commit('SET_EDITOR_STATE', payload);
    },
    setGoodOnEdit: ({ commit }, payload) => {
        commit('SET_GOOD_ON_EDIT', { ...payload });
        commit('SET_EDITOR_STATE', true);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
};
