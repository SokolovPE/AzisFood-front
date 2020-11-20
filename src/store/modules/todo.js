import axios from 'axios';

const todosUrl = 'https://vue-http-f059c.firebaseio.com/todos.json';

const state = {
    todos: []
};

const getters = {
    getTodos: state => {
        return state.todos;
    },
    getNextId: state => {
        return state.todos.length
            ? Math.max(...state.todos.map(x => x.id)) + 1
            : 0;
    }
    // getTodo: state => id => {
    //     return state.todos.find(x => x.id == id);
    // }
};

const mutations = {
    SET_TODOS(state, payload) {
        state.todos = payload;
    },
    ADD_TODO(state, payload) {
        state.todos.push(payload);
    },
    REMOVE_TODO(state, payload) {
        state.todos = state.todos.filter(x => x != payload);
    }
};

const actions = {
    fetchTodos: async ({ commit }) => {
        let { data } = await axios.get(todosUrl);
        let processed = Object.keys(data).map(todo => {
            return {
                id: data[todo].id,
                title: data[todo].title,
                firebaseKey: todo
            };
        });
        commit('SET_TODOS', processed);
    },
    addTodo: async ({ commit, getters }, payload) => {
        let nextId = getters.getNextId;
        let newTodo = { id: nextId, title: payload };
        await axios.post(todosUrl, newTodo).then(result => {
            if (result.status == 200) {
                newTodo.firebaseKey = result.data.name;
                commit('ADD_TODO', newTodo);
            }
        });
    },
    setTodos: ({ commit }, payload) => {
        axios
            .put(todosUrl, payload)
            .then(response => {
                console.log(response);
                console.log('PUT was performed successfull!');
                commit('SET_TODOS', payload);
            })
            .catch(error => {
                console.log(`Error during PUT ${error}`);
            });
    },
    removeTodo: ({ commit }, payload) => {
        axios
            .delete(
                `${todosUrl.replace('.json', '')}/${payload.firebaseKey}.json`
            )
            .then(() => {
                commit('REMOVE_TODO', payload);
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
