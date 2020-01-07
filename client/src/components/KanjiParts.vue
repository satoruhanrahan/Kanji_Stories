<template>
  <div v-if="kanji.parts !== 'null'" id="partsSection" class="infoSection">
    <span id="partsHeader">Parts:</span>
    <div
      class="part"
      v-for="(part, index) in kanji.parts"
      v-bind:key="`part-${index}`"
    >{{ kanji.parts[`${index}`] }}</div>
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
  width: 50vw;
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
#partsSection {
  margin-left: 2rem;
  margin-bottom: 2rem;
  width: 80vw;
}
#partsHeader {
  display: flex;
  align-items: center;
  margin-right: 0.3rem;
}
</style>