<template>
  <div id="container">
    <HeaderWithBtn />
    <div id="leftSide">
      <div id="kanji">{{ kanji.kanji }}</div>
      <!-- kanjiInfo for larger screens -->
      <KanjiInfo id="kanjiInfo2" v-bind:kanji="kanji" />
    </div>
    <!-- kanjiInfo for smaller screens -->
    <div id="kanjiInfo1">
      <div class="infoSection">{{ kanji.meaning }}</div>
      <div class="infoSection">{{ kanji.onyomi }}</div>
      <div class="infoSection">{{ kanji.kunyomi }}</div>
    </div>
    <div v-if="kanji.parts !== 'null'" id="partsSection" class="infoSection">
      <span id="partsHeader">Parts:</span>
      <div
        class="part"
        v-for="(part, index) in kanji.parts"
        v-bind:key="`part-${index}`"
      >{{ kanji.parts[`${index}`] }}</div>
    </div>
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
import KanjiInfo from "../components/KanjiInfo";
import StoryService from "../StoryService";

export default {
  components: {
    HeaderWithBtn,
    KanjiInfo
  },
  data() {
    return {
      kanji: {},
      currentStory: {},
      newStory: "",
      makePublic: true
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
#container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f2ed;
}
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
/* For smaller screens */
#kanjiInfo1 {
  width: 50vw;
  margin-top: 1rem;
  margin-right: 1rem;
  margin-bottom: 1.5rem;
  display: inline-block;
}
/* For larger screens */
#kanjiInfo2 {
  display: none;
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
  #storyWrapper {
    margin-right: 10vw;
    margin-left: 10vw;
  }
  #kanjiInfo1 {
    display: none;
  }
  #kanjiInfo2 {
    display: inline-block;
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