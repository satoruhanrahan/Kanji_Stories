<template>
  <div id="container">
    <HeaderWithBtn id="header" />
    <div id="leftSide">
      <div id="kanji">{{ kanji.kanji }}</div>
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
    </div>
    <div id="rightSide">
      <div id="storyWrapper">
        <div id="storyHeader">Story</div>
        <div id="textAreaWrapper">
          <textarea name="storyArea" id="storyArea" cols="30" rows="5"></textarea>
          <font-awesome-icon id="editBtn" icon="edit"></font-awesome-icon>
        </div>
      </div>
      <div id="vpsBtn">Public Stories</div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import HeaderWithBtn from "../components/HeaderWithBtn";

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

<style scoped>
.infoSection {
  float: left;
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
#container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f2ed;
}
#kanji {
  height: 25vh;
  width: 25vh;
  background: #fff;
  font-size: 15vh;
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
  float: left;
  margin-top: 1rem;
}
#vpsBtn {
  height: 2rem;
  width: 15rem;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 1px solid #707070;
  margin-top: 1rem;
  cursor: pointer;
  background-color: #2b2626;
  color: #fff;
}
#textAreaWrapper {
  height: fit-content;
  width: fit-content;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}
#storyArea {
  margin-top: 0.5rem;
  border: 1px solid #707070;
  margin-left: auto;
  margin-right: auto;
}
#editBtn {
  position: absolute;
  right: 0.3rem;
  bottom: 0.6rem;
  font-size: 1.1rem;
  color: #2b2626;
}
#storyWrapper {
  display: inline-block;
  margin-right: auto;
  margin-left: auto;
}
/* Smartphones */
@media screen and (max-width: 500px) {
}
/* Tablets & Small Laptops */
@media screen and (min-width: 501px) and (max-width: 768px) {
  #storyWrapper {
    margin-right: 20vw;
    margin-left: 20vw;
  }
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
  #kanji {
    float: left;
    margin-left: 10vw;
    height: 32vh;
    width: 32vh;
    font-size: 18vh;
  }
  #info {
    width: 55vw;
    float: right;
    margin-top: 3rem;
    margin-right: 3rem;
  }
  #storyWrapper {
    margin-left: 20vw;
    margin-right: 20vw;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  #storyArea {
    width: 25rem;
    margin-right: auto;
    margin-left: auto;
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
  }
  #container {
    background: #fff;
    z-index: -1;
  }
  #rightSide {
    width: 62vw;
    height: fit-content;
    float: right;
    padding-top: 5rem;
  }
  #storyArea {
    width: 25rem;
    margin-right: auto;
    margin-left: auto;
  }
  #storyHeader {
    font-weight: 500;
    font-size: 1.2rem;
    padding-bottom: 0.5rem;
  }
  #vpsBtn {
    margin-top: 4rem;
  }
}
</style>