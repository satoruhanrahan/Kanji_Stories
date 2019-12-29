import axios from 'axios';
import store from './store';

class KanjiService {
  static getKanji() {
    return new Promise(async (resolve, reject) => {
      const kanji = JSON.parse(store.getters.getKanji);
      if (kanji)
        resolve(kanji);
      else {
        if (store.getters.loggedIn)
          axios.defaults.headers.common['auth_token'] = store.getters.getToken;
        store.dispatch('retrieveKanji')
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          })
      }
    })
  }
}

export default KanjiService;