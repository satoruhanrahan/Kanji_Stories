<template>
  <div id="container">
    <HeaderWithBtn />
    <div id="leftSide">
      <div id="kanji">{{ kanji.kanji }}</div>
      <!-- for larger screens -->
      <KanjiInfo id="kanjiInfo2" v-bind:kanji="kanji" />
    </div>
    <!-- for smaller screens -->
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
      <h3 id="storiesheader">Stories</h3>
      <div v-for="story in publicStories" v-bind:key="story._id" class="storyWrapper">
        <div class="username">{{ story.creator }}</div>
        <div class="story">{{ story.story }}</div>
        <div class="useStoryBtn" v-on:click="useStory(story._id)">Use Story</div>
      </div>
      <div
        v-if="publicStories.length == 0"
        id="noStories"
      >There are no public stories for this kanji.</div>
    </div>
  </div>
</template>

<script>
import HeaderWithBtn from "../components/HeaderWithBtn";
import KanjiInfo from "../components/KanjiInfo";
import StoryService from "../StoryService";
import router from "../router";

export default {
  components: {
    HeaderWithBtn,
    KanjiInfo
  },
  data() {
    return {
      kanji: {},
      publicStories: []
    };
  },
  created() {
    //get kanji
    const kanji = JSON.parse(localStorage.getItem("currentKanji"));
    this.kanji = kanji;
    //get public stories
    let publicStories = StoryService.getPublicStories(kanji._id);
    this.publicStories = publicStories;
  },
  methods: {
    useStory(storyID) {
      StoryService.useStory(storyID);
      router.push({
        name: "Kanji",
        params: { kanjiID: this.kanji._id, storyID: storyID }
      });
    }
  }
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
.story {
  padding: 0.3rem;
  border: 1px solid #707070;
  background: #efe9df;
}
.storyWrapper {
  margin-left: 10vw;
  margin-right: 10vw;
  margin-top: 1rem;
}
.username {
  width: 100%;
  display: flex;
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
}
.useStoryBtn {
  background: #2b2626;
  color: #fff;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #707070;
  border-top: none;
  cursor: pointer;
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
#noStories {
  margin-top: 2rem;
}
#storiesHeader {
  display: none;
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
  /* #storiesHeader {
    display: inline-block;
    position: absolute;
    left: 0;
  } */
}
</style>