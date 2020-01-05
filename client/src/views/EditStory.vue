<template>
  <div id="container">
    <HeaderWithBtn />
  </div>
</template>

<script>
import HeaderWithBtn from '../components/HeaderWithBtn';
export default {
  components: {
    HeaderWithBtn
  }
}
</script>

<style scoped>
#container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  background-color: #f5f2ed;
}
</style>