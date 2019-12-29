import axios from 'axios';

const url = 'http://localhost:3000/api/user/signup';

class SignUpService {
  // Sign up new account
  static signup(username, email, password) {
    return axios.post(url, {
      username: username,
      email: email, 
      password: password
    });
  }
}

export default SignUpService;