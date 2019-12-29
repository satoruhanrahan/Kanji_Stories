import axios from 'axios';

const loginUrl = 'http://localhost:3000/api/user/login';

const state = {
  token: localStorage.getItem('auth_token') || null
};

const getters = {
  loggedIn(state) {
    return state.token !== null;
  },
  getToken(state) {
    return state.token;
  }
};

const actions = {
  retrieveToken(context, credentials) {
    return new Promise((resolve, reject) => {
      axios.post(loginUrl, {
        email: credentials.email,
        password: credentials.password
      })
        .then(response => {
          const token = response.data;
          localStorage.setItem('auth_token', token);
          axios.defaults.headers.common['auth_token'] = token;
          context.commit('retrieveToken', token);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  destroyToken(context) {
    if (context.getters.loggedIn) {
      localStorage.removeItem('auth_token');
      context.commit('destroyToken');
      axios.defaults.headers.common['auth_token'] = '';
    }
  }
};

const mutations = {
  retrieveToken(state, token) {
    state.token = token;
  },
  destroyToken(state) {
    state.token = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}