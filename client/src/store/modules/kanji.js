import axios from 'axios';

const url = '/api/kanji';

const state = {
  kanji: localStorage.getItem('kanji') || null
};

const getters = {
  getKanji(state) {
    return state.kanji;
  }
};

const actions = {
  retrieveKanji(context) {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(response => {
          const kanji = response.data;
          localStorage.setItem('kanji', JSON.stringify(kanji));
          context.commit('retrieveKanji', JSON.stringify(kanji));
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

const mutations = {
  retrieveKanji(state, kanji) {
    state.kanji = kanji;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}