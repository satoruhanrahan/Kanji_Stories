<template>
  <div id="container">
    <div class="main-portion" id="header">
      <img src="../assets/logo.png" alt="Kanji Stories" />
    </div>
    <h4 class="main-portion" id="header-sml">Use stories to learn kanji!</h4>
    <div class="main-portion">
      <p id="description">
        Mnemonics or stories, are a
        powerful brain hack for studying
        kanji. This app gives you stories to
        remember kanji, lets you make
        and share your own stories with
        other people.
      </p>
    </div>
    <div class="main-portion">
      <router-link to="/signup">
        <SignUpBtn />
      </router-link>
      <router-link to="/login">
        <LoginBtn />
      </router-link>
    </div>
    <IconDescriptions />
  </div>
</template>

<script>
import IconDescriptions from '../components/IconDescriptions.vue'
import SignUpBtn from '../components/SignUpBtn.vue'
import LoginBtn from '../components/LoginBtn.vue'

export default {
  components: {
    IconDescriptions,
    SignUpBtn,
    LoginBtn
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
#header-sml {
  color: #fff;
}
/* background image */
#container {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100vw;
  background: url(../assets/background-sml.jpg);
  z-index: -2;
}
/* background image overlay */
#container:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  min-height: 100vh;
  background: rgba(29, 29, 29, 0.7);
  z-index: -1;
}
/* Kanji stories logo section */
#header {
  position: relative;
  width: 100vw;
  height: 12vh;
  background: rgba(255, 255, 255, 0.1);
  font-size: 2.5rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
}
#description {
  color: #fff;
}

/* Smartphones */
@media screen and (max-width: 500px) {
  #description {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
/* Tablets & Small Laptops */
@media screen and (min-width: 501px) and (max-width: 768px) {
  #container {
    background: url(../assets/background-med.jpg);
  }
  #description {
    margin-left: 3rem;
    margin-right: 3rem;
  }
}
/* Desktops & Laptops */
@media screen and (min-width: 769px) and (max-width: 1170px) {
  /* shift to right side of screen */
  .main-portion {
    width: 60vw;
    float: right;
  }
  #container {
    background: url(../assets/background-lrg.jpg);
  }
  #header {
    width: 60vw;
    float: right;
    background: none;
    margin-top: 5rem;
  }
  #description {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}
/* Widescreens */
@media screen and (min-width: 1171px) {
  /* shift to right side of screen */
  .main-portion {
    width: 60vw;
    float: right;
  }
  #container {
    background: url(../assets/background.jpg);
  }
  #header {
    width: 60vw;
    float: right;
    background: none;
    margin-top: 5rem;
  }
  #description {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}
</style>