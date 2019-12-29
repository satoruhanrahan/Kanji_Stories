import store from './store/index'

class LoginService {
  static login(email, password) {
    return new Promise((resolve, reject) => {
      store.dispatch('retrieveToken', {
        email: email,
        password: password
      })
        .then(()=>{
          resolve();
        })
        .catch((err)=> {
          reject(err);
        })
    })
  } 
}

export default LoginService;