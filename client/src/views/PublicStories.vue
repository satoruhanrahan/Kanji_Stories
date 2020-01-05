<template>
  <div id="container">
    <HeaderWithBtn />
    <div id="kanji">{{ kanji.kanji }}</div>
    <div id="kanjiInfo">
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
    <div v-for="story in publicStories" v-bind:key="story._id" class="storyWrapper">
      <div class="username">{{ story.creator }}</div>
      <div class="story">{{ story.story }}</div>
      <div class="useStoryBtn" v-on:click="useStory(story._id)" >Use Story</div>
    </div>
    <div v-if="publicStories.length == 0" id="noStories">There are no public stories for this kanji.</div>
  </div>
</template>

<script>
import HeaderWithBtn from "../components/HeaderWithBtn";
import StoryService from '../StoryService';
import router from '../router';

export default {
  components: {
    HeaderWithBtn
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
      StoryService.useStory(storyID)
      router.push({ name: 'Kanji', params: { kanjiID: this.kanji._id, storyID: storyID } }); 
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
  background: #EFE9DF;
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
#kanjiInfo {
  width: 50vw;
  margin-top: 1rem;
  margin-right: 1rem;
  margin-bottom: 1.5rem;
  display: inline-block;
}
#noStories {
  margin-top: 2rem;
}
</style>