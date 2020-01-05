<template>
  <div id="container">
    <HeaderWithBtn id="header" />
    <div id="leftSide">
      <div id="kanji">{{ kanji.kanji }}</div>
      <KanjiInfo v-bind:kanji="kanji" />
    </div>
    <div id="rightSide">
      <div id="storyWrapper">
        <div id="storyHeader">Story</div>
        <router-link to="/editStory">
          <font-awesome-icon id="editBtn" icon="edit"></font-awesome-icon>
        </router-link>
        <div id="story">{{ story }}</div>
      </div>
      <router-link to="/publicStories">
        <div id="vpsBtn">Public Stories</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import store from "../store";
import HeaderWithBtn from "../components/HeaderWithBtn";
import KanjiInfo from "../components/KanjiInfo";
import StoryService from '../StoryService';

export default {
  components: {
    HeaderWithBtn,
    KanjiInfo
  },
  data() {
    return {
      kanji: {},
      story: {}
    };
  },
  created() {
    //get kanji
    const allKanji = JSON.parse(store.getters.getKanji);
    if(this.$route.params.kanjiID){
      const kanji = allKanji.find(kanji => kanji._id === this.$route.params.kanjiID);
      this.kanji = kanji;
      localStorage.setItem('currentKanji', JSON.stringify(kanji));
    } else {
      this.kanji = JSON.parse(localStorage.getItem('currentKanji'));
    }
    //get story
    if(this.$route.params.storyID){
      const storyID = this.$route.params.storyID;
      this.story = StoryService.getStoryByID(storyID).story;
      const currentStory = StoryService.getStoryByID(storyID)
      localStorage.setItem('currentStory', JSON.stringify(currentStory));
    }
    else
      this.story = StoryService.getStoryByKanji(this.kanji._id);
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
#container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  background-color: #f5f2ed;
}
#kanji {
  height: 18vh;
  width: 18vh;
  background: #fff;
  font-size: 11vh;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  color: #2b2626;
  border: 1px solid #707070;
  display: flex;
  justify-content: center;
  align-items: center;
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
#story {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: #707070 1px solid;
  padding: 0.3rem;
  background: #EFE9DF;
}
#storyHeader {
  margin-top: 1rem;
  display: flex;
  font-weight: 500;
  font-size: 1.2rem;
}
#storyWrapper {
  display: inline-block;
  margin-right: 10vw;
  margin-left: 10vw;
  margin-top: 1rem;
  position: relative;
}
#editBtn {
  position: absolute;
  font-size: 1.1rem;
  color: #2b2626;
  cursor: pointer;
  right: 0;
  top: 1.2rem;
}
/* Desktops & Laptops */
@media screen and (min-width: 769px) and (max-width: 1170px) {
  #kanji {
    float: left;
    margin-left: 10vw;
  }
  #storyWrapper {
    margin-left: 20vw;
    margin-right: 20vw;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}
/* Widescreens */
@media screen and (min-width: 1171px) {
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
  #storyHeader {
    padding-bottom: 0.5rem;
  }
  #storyWrapper {
    margin-right: 10vw;
    margin-left: 10vw; 
  }
  #vpsBtn {
    margin-top: 4rem;
  }
}
</style>