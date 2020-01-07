<template>
  <div id="header">
    <routerLink v-if="backUrl != 'noBackUrl'" :to="backUrl">
      <font-awesome-icon id="backBtn" icon="arrow-left"></font-awesome-icon>
    </routerLink>
    <routerLink to="/">
      <img id="logo" src="../assets/logo.png" alt="Kanji Stories" />
    </routerLink>  
  </div>
</template>

<script>
export default {
  props: ['backUrl']
};
</script>

<style scoped>
#header {
  height: 2.5rem;
  width: 100vw;
  background-color: #2B2626;
  display: flex;
  align-items: center;
}
#logo {
  height: 1rem;
  float: left;
  margin-left: 1rem;
  margin-top: 0.2rem;
}
#backBtn {
  color: #fff;
  font-size: 1.3rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>