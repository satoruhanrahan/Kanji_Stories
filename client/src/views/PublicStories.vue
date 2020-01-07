<template>
  <div id="container">
    <HeaderWithBtn v-bind:backUrl="backUrl" />
    <KanjiAndInfo v-bind:kanji="kanji" />
    <KanjiInfoSml v-bind:kanji="kanji" />
    <KanjiParts v-bind:kanji="kanji" />
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
import KanjiAndInfo from '../components/KanjiAndInfo';
import KanjiInfoSml from '../components/KanjiInfoSml';
import KanjiParts from '../components/KanjiParts';
import StoryService from "../StoryService";
import router from "../router";

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
      publicStories: [],
      backUrl: '/kanji'
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

#container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f2ed;
}



#noStories {
  margin-top: 2rem;
}
h3 {
  display: none;
}

/* Desktops & Laptops & Widescreens*/
@media screen and (min-width: 769px){
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
  h3 {
    display: inline-block;
  }
}
</style>