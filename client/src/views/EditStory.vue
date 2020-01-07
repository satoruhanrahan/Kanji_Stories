<template>
  <div id="container">
    <HeaderWithBtn v-bind:backUrl="backUrl" />
    <KanjiAndInfo v-bind:kanji="kanji" />
    <KanjiInfoSml v-bind:kanji="kanji" />
    <KanjiParts v-bind:kanji="kanji" />
    <div id="rightSide">
      <div class="storyWrapper">
        <div id="storyHeader">Current Story</div>
        <div id="currentStory">{{ currentStory.story }}</div>
      </div>
      <div class="storyWrapper">
        <div id="storyHeader">New Story</div>
        <textarea v-model="newStory" name="newStory" id="newStory" cols="30" rows="10"></textarea>
      </div>
      <div id="makePublicSection">
        <div
          id="publicBtn"
          v-bind:class="{ makePublic: makePublic }"
          v-on:click="makePublic = !makePublic"
        >
          <div id="slider" v-bind:class="{ leftPos: makePublic }"></div>
          <div id="no" v-bind:class="{ hidden: makePublic }">No</div>
          <div id="yes" v-bind:class="{ display: makePublic }">Yes</div>
        </div>
        <div id="makePublic">Make Public</div>
      </div>
      <div class="button" id="updateBtn" v-on:click="update()">Update</div>
      <router-link to="/kanji">
        <div class="button" id="cancelBtn">Cancel</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import router from "../router";
import HeaderWithBtn from "../components/HeaderWithBtn";
import KanjiAndInfo from '../components/KanjiAndInfo';
import KanjiInfoSml from '../components/KanjiInfoSml';
import KanjiParts from '../components/KanjiParts';
import StoryService from "../StoryService";

export default {
  components: {
    HeaderWithBtn,
    KanjiAndInfo,
    KanjiInfoSml,
    KanjiParts
  },
  data() {
    return {
      kanji: {},
      currentStory: {},
      newStory: "",
      makePublic: true,
      backUrl: '/kanji'
    };
  },
  created() {
    //get kanji
    const kanji = JSON.parse(localStorage.getItem("currentKanji"));
    this.kanji = kanji;
    //get current story
    const currentStory = JSON.parse(localStorage.getItem("currentStory"));
    this.currentStory = currentStory;
  },
  methods: {
    update() {
      StoryService.update(
        this.currentStory._id,
        this.newStory,
        this.makePublic,
        this.kanji._id
      );
      router.push({
        name: "Kanji",
        params: { kanjiID: this.kanji._id, story: this.newStory }
      });
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.storyWrapper {
  margin-left: 10vw;
  margin-right: 10vw;
  margin-top: 1rem;
}
.button {
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
#updateBtn {
  background-color: #2b2626;
}
#cancelBtn {
  background-color: #d5d5d5;
  color: #2b2626;
}
#currentStory {
  padding: 0.3rem;
  border: 1px solid #707070;
  background: #efe9df;
}
#newStory {
  width: 100%;
  height: 5rem;
  background: #707070 1px solid;
  border: #707070 1px solid;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 1rem;
}
#storyHeader {
  width: 100%;
  display: flex;
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
}
#container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f2ed;
}
#makePublicSection {
  display: inline-block;
  width: 13rem;
  margin-bottom: 1rem;
}
#publicBtn.makePublic {
  height: 2rem;
  width: 5rem;
  background: #d5d5d5;
  border: #707070 1px solid;
  border-radius: 20px;
  margin-top: 2rem;
}
#publicBtn {
  height: 2rem;
  width: 5rem;
  background: #707070;
  border: #707070 1px solid;
  border-radius: 20px;
  margin-top: 2rem;
}
#no {
  float: left;
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-left: 1.1rem;
}
#no.hidden {
  display: none;
}
#yes {
  color: #707070;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0.5rem;
  margin-right: 0.7rem;
}
#yes.display {
  color: #2b2626;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0.5rem;
  margin-right: 0.7rem;
}
#slider.leftPos {
  height: 1.5rem;
  width: 1.5rem;
  position: absolute;
  background: #2b2626;
  border: #707070 solid 1px;
  border-radius: 15px;
  margin-top: 0.2rem;
  margin-left: 0.3rem;
}
#slider {
  height: 1.5rem;
  width: 1.5rem;
  position: absolute;
  background: #2b2626;
  border: #707070 solid 1px;
  border-radius: 15px;
  margin-top: 0.2rem;
  margin-left: 3.1rem;
  transition: margin-left 0.3s ease-out;
}
#makePublic {
  width: fit-content;
  float: right;
  position: relative;
  margin-top: -1.5rem;
}
/* Desktops & Laptops & Widescreens*/
@media screen and (min-width: 769px) {
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
  #storyWrapper {
    margin-right: 10vw;
    margin-left: 10vw;
  }
  #makePublicSection {
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
  #updateBtn {
    margin-bottom: 1.5rem;
  }
}
</style>