<template>
  <div id="leftSide">
    <div id="kanji">{{ kanji.kanji }}</div>
    <!-- for larger screens -->
    <KanjiInfo id="kanjiInfo2" v-bind:kanji="kanji" />
  </div>
</template>

<script>
import KanjiInfo from "../components/KanjiInfo";
export default {
  props: ['kanji'],
  components: {
    KanjiInfo
  }
};
</script>

<style scoped>
#kanji {
  height: 15vh;
  width: 15vh;
  background: #fff;
  float: left;
  margin: 1rem;
  color: #2b2626;
  font-size: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: #2b2626 1px solid;
}
/* For larger screens */
#kanjiInfo2 {
  display: none;
}
/* Tablets & Small Laptops */
@media screen and (min-width: 501px) and (max-width: 768px) {
  #kanji {
    margin-left: 6rem;
  }
}
/* Desktops & Laptops & Widescreens*/
@media screen and (min-width: 769px){
  #leftSide {
    background: #f5f2ed;
    width: 38vw;
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    z-index: -1;
    padding-top: 4rem;
    border-right: #2b2626 1px solid;
  }
  #kanji {
    margin-bottom: 3rem;
    margin-left: 5rem;
    margin-top: 3rem;
    height: 20vh;
    width: 20vh;
    font-size: 15vh;
  }
  #kanjiInfo2 {
    display: inline-block;
  }
}
</style>