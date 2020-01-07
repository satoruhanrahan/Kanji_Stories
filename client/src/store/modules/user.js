import axios from 'axios';

const loginUrl = 'http://localhost:3000/api/user/login';

const state = {
  token: localStorage.getItem('auth_token') || null,
  userID: localStorage.getItem('userID') || null
};

const getters = {
  loggedIn(state) {
    return state.token !== null;
  },
  getToken(state) {
    return state.token;
  },
  getUserID(state) {
    return state.userID;
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
          const token = response.data.token;
          const userID = response.data.userID;
          const username = response.data.username;
          localStorage.setItem('auth_token', token);
          localStorage.setItem('userID', userID);
          localStorage.setItem('username', username);
          axios.defaults.headers.common['auth_token'] = token;
          context.commit('retrieveToken', userID, token);
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
  retrieveToken(state, userID, token) {
    state.userID = userID;
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