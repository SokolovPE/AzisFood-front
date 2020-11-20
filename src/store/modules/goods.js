import axios from 'axios';

const dbUrl = 'https://vue-http-f059c.firebaseio.com';
//const goodsUrl = `${dbUrl}/goods.json`;
const categoriesUrl = `${dbUrl}/cats.json`;

const state = {
    categories: [],
    goods: [
        {
            id: '',
            categoryId: '-MMTvIpV0iypn2OtdKsc',
            category: 'Chicken Burgers',
            title: 'Mc Hamburger',
            description: 'Chicken and ham.',
            imgUrl: require('@/assets/goods/burgers/mcChick.png'),
            price: 5.99
        },
        {
            id: '',
            categoryId: '-MMTvWXfJdAepJ7YNqdM',
            category: 'Beef Burgers',
            title: 'Mc Beefburger',
            description: 'Beef and ham.',
            imgUrl: require('@/assets/goods/burgers/mcBeef.png'),
            price: 7.99
        },
        {
            id: '',
            categoryId: '-MMTvWXfJdAepJ7YNqdM',
            category: 'Beef Burgers',
            title: 'Royal Mc Beefburger',
            description: 'Royal Beef and ham.',
            imgUrl: require('@/assets/goods/burgers/royalMcBeef.png'),
            price: 9.99
        },
        {
            id: '',
            categoryId: '-MMTvWXfJdAepJ7YNqdM',
            category: 'Beef Burgers',
            title: 'Bacon Mc Beefburger',
            description: 'Bacon, Beef and ham.',
            imgUrl: require('@/assets/goods/burgers/baconMcBeef.png'),
            price: 8.99
        },
        {
            id: '',
            categoryId: '-MMTvYlwk3e_dEwjt_IZ',
            category: 'Drinks',
            title: 'Sparkling water',
            description: 'Clean water.',
            imgUrl: require('@/assets/goods/drinks/water.png'),
            price: 0.99
        }
    ]
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
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
};
