<template>
  <div id="container">
    <Header id="header" v-bind:backUrl="backUrl"/>
    <div id="mainSection">
      <routerLink to="/">
        <img id="logo-dark" src="../assets/logo-dark.png" alt="Kanji Stories" />
      </routerLink>
      <h3 id="header-sml">Log in to your account</h3>
      <input type="email" placeholder="Email" v-model="email" v-on:keyup.enter="login"/>
      <input type="password" placeholder="Password" v-model="password" v-on:keyup.enter="login"/>
      <LoginBtn id="loginBtn" v-on:click.native="login" />
      <div id="errorMessage" v-bind="errorMessage">{{errorMessage.text}}</div>
    </div>
    <div id="leftSide">
      <IconDescriptions id="iconDescriptions" />
    </div>
  </div>
</template>

<script>
import router from "../router";
import LoginBtn from "../components/LoginBtn";
import Header from "../components/Header";
import LoginService from "../LoginService";
import IconDescriptions from '../components/IconDescriptions'

export default {
  components: {
    LoginBtn,
    Header,
    IconDescriptions
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: { text: "" },
      backUrl: '/'
    };
  },
  methods: {
    async login() {
      try {
        await LoginService.login(this.email, this.password);
        router.push("kanjiList");
      } catch (err) {
        if (err.response.status == 400)
          this.errorMessage = { text: err.response.data };
      }
    }
  }
};
</script>

<style scoped>
input {
  border: none;
  border-bottom: solid 1px #2b2626;
  outline: none;
  background-color: #f5f2ed;
  width: 65vw;
  margin: 1.5rem;
}
input:focus {
  box-shadow: 0 4px 2px -2px #92a18d;
}
#container {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100vw;
  background-color: #f5f2ed;
}
#logo {
  height: 1rem;
  float: left;
  margin-left: 1rem;
  margin-top: 0.2rem;
}
#header-sml {
  margin-top: 3rem;
  margin-bottom: 2rem;
  color: #2b2626;
}
#loginBtn {
  margin-top: 1.5rem;
}
#errorMessage {
  margin: 1rem;
  color: #2b2626;
}
#logo-dark {
  margin-top: 4.5rem;
}
/* Smartphones */
@media screen and (max-width: 500px) {
  #logo-dark {
    display: none;
  }
  #iconDescriptions {
    display: none;
  }
}
/* Tablets & Small Laptops */
@media screen and (min-width: 501px) and (max-width: 768px) {
  input {
    width: 20rem;
    margin-left: 4rem;
    margin-right: 4rem;
  }
  #logo-dark {
    display: none;
  }
  #iconDescriptions {
    display: none;
  }
}
/* Desktops & Laptops */
@media screen and (min-width: 769px) and (max-width: 1170px) {
  /* shift to right side of screen */
  #mainSection {
    width: 60vw;
    max-height: 100vh;
    float: right;
  }
  input {
    width: 17rem;
    margin-left: 4rem;
    margin-right: 4rem;
  }
  #leftSide {
    background: url(../assets/background-med.jpg);
    width: 40vw;
    height: 100vh;
    display: block;
    justify-content: center;
    align-items: center;
  }
  #header {
    display: none;
  }
  #iconDescriptions {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 3rem;
    background: rgba(29, 29, 29, 0.7);
  }
  #logo-dark {
    height: 2.5rem;
  }
}
/* Widescreens */
@media screen and (min-width: 1171px) {
  /* shift to right side of screen */
  #mainSection {
    width: 60vw;
    float: right;
    max-height: 100vh;
  }
  input {
    width: 17rem;
    margin-left: 8rem;
    margin-right: 8rem;
  }
  #leftSide {
    background: url(../assets/background-med.jpg);
    width: 40vw;
    max-height: 100vh;
    display: block;
    justify-content: center;
    align-items: center;
  }
  #header {
    display: none;
  }
  #iconDescriptions {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 3rem;
    background: rgba(29, 29, 29, 0.7);
  }
  #logo-dark {
    height: 2.5rem;
  }
}
</style>