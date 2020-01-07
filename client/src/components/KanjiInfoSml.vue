<template>
  <div id="kanjiInfo1">
    <div class="infoSection">{{ kanji.meaning }}</div>
    <div class="infoSection">{{ kanji.onyomi }}</div>
    <div class="infoSection">{{ kanji.kunyomi }}</div>
  </div>
</template>

<script>
export default {
  props: ['kanji']
};
</script>

<style>
.infoSection {
  float: left;
  display: flex;
  width: 50vw;
}
#kanjiInfo1 {
  width: 50vw;
  margin-top: 1rem;
  margin-right: 1rem;
  margin-bottom: 1.5rem;
  display: inline-block;
}
/* Desktops & Laptops & Widescreens*/
@media screen and (min-width: 769px){
  #kanjiInfo1 {
    display: none;
  }
}
</style>