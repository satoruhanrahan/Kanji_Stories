<template>
  <div id="header">
    <img id="logo" src="../assets/logo.png" alt="Kanji Stories" />
    <div id="logoutBtn" v-on:click="logout">Logout</div>
  </div>
</template>

<script>
import store from '../store'
import router from '../router'

export default {
  methods: {
    logout() {
      store.dispatch("destroyToken").then(() => {
        router.push("login");
      });
    }
  }
};
</script>

<style scoped>
#header {
  height: 2.5rem;
  width: 100vw;
  background-color: #2b2626;
  display: flex;
  align-items: center;
}
#logo {
  height: 1rem;
  float: left;
  margin-left: 1rem;
  margin-top: 0.2rem;
}
#logoutBtn {
  height: 1.5rem;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 1px solid #707070;
  cursor: pointer;
  background-color: #f5f2ed;
  color: #2b2626;
  position: absolute;
  right: 1rem;
  top: 0.5rem;
}
</style>