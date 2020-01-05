<template>
  <div id="info">
    <div class="infoSection">
      <span class="infoHeader">Meaning:</span>
      <span class="infoData">{{ kanji.meaning }}</span>
    </div>
    <div class="infoSection">
      <span class="infoHeader">Onyomi:</span>
      <span class="infoData">{{ kanji.onyomi }}</span>
    </div>
    <div class="infoSection">
      <span class="infoHeader">Kunyomi:</span>
      <span class="infoData">{{ kanji.kunyomi }}</span>
    </div>
    <div v-if="kanji.parts !== 'null'" class="infoSection">
      <span class="infoHeader">Parts:</span>
      <div
        class="part"
        v-for="(part, index) in kanji.parts"
        v-bind:key="`part-${index}`"
      >{{ kanji.parts[`${index}`] }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['kanji']
};
</script>

<style scoped>
.infoSection {
  float: left;
  display: flex;
  margin-left: 10vw;
  margin-right: 8vw;
  margin-top: 0.5rem;
}
.infoHeader {
  width: 25vw;
  height: 1.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 1rem;
}
.infoData {
  /* width: 45vw; */
  display: flex;
  align-items: center;
}
.part {
  width: 3rem;
  height: 1.5rem;
  display: inline-block;
  background: #d5d5d5;
  border: 1px solid #707070;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  margin-right: 0.5rem;
}
#info {
  margin-top: 1.5rem;
}

/* Desktops & Laptops */
@media screen and (min-width: 769px) and (max-width: 1170px) {
  .infoSection {
    display: flex;
    justify-content: left;
    align-items: flex-start;
    margin-left: 1rem;
    margin-top: 1.5rem;
  }
  .infoHeader {
    display: inline-block;
    width: fit-content;
  }
  #info {
    width: 40vw;
    float: right;
    margin-top: 3rem;
    margin-right: 3rem;
  }
}
/* Widescreens */
@media screen and (min-width: 1171px) {
  .infoHeader {
    width: fit-content;
  }
  .infoData {
    width: fit-content;
  }
  .infoSection {
    margin-left: 6vw;
    margin-top: 1rem;
    width: 30vw;
  }
}
</style>