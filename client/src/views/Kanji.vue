<template>
  <div id="container">
    <HeaderWithBtn id="header"/>
    <div id="kanji">{{ kanji.kanji }}</div>
    <div id="info">
      <div class="infoSection">
        <span class="infoHeader"> Meaning: </span>
        <span class="infoData">{{ kanji.meaning }}</span>
      </div>
      <div class="infoSection">
        <span class="infoHeader"> Onyomi: </span>
        <span class="infoData">{{ kanji.onyomi }}</span>
      </div>
      <div class="infoSection">
        <span class="infoHeader"> Kunyomi: </span>
        <span class="infoData">{{ kanji.kunyomi }}</span>
      </div>
      <div v-if="kanji.parts !== 'null'" class="infoSection">
        <span class="infoHeader">Parts: </span>
        <div class="part" v-for="(part, index) in kanji.parts" v-bind:key="`part-${index}`">
          {{ kanji.parts[`${index}`] }}
        </div>
      </div>
      <div class="infoSection">
        <span id="storyHeader">Story:</span>
      </div>
      <textarea name="storyArea" id="storyArea" cols="30" rows="5"></textarea>
    </div>
    
  </div>
</template>

<script>
import store from "../store";
import HeaderWithBtn from '../components/HeaderWithBtn';

export default {
  components: {
    HeaderWithBtn
  },
  data() {
    return {
      kanji: {}
    };
  },
  created() {
    //get all kanji from store
    const allKanji = JSON.parse(store.getters.getKanji);
    //find kanji with id
    const kanji = allKanji.find(kanji => kanji._id === this.$route.params.id);
    //set kanji to data
    this.kanji = kanji;
  }
};
</script>

<style>
.infoSection {
  float: left;
  width: fit-content;
  display: flex;
  margin-left: 10vw;
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
  width: 45vw;
  display: flex;
}
.part {
  width: 3rem;
  height: 1.5rem;
  display: inline-block;
  background: #D5D5D5;
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
#container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f2ed;
}
#kanji{
  height: 33vh;
  width: 33vh;
  background: #fff;
  font-size: 17vh;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  color: #2b2626;
  border: 1px solid #707070;
  display: flex;
  justify-content: center;
  align-items: center;
}
#storyHeader {
  margin-right: 100vw;
  margin-left: 5vw;
} 
#storyArea {
  margin-top: 0.5rem;
  border: 1px solid #707070;
} 
</style>