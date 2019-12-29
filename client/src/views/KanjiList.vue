<template>
  <div id="container">
    <HeaderWithBtn />
    <h3 id="header-sml">Select a kanji:</h3>
    <div id="kanjiContainer">
      <div class="kanjiBtn" v-for="kanji in N5Kanji" v-bind:key="kanji._id">
        <router-link :to="{ path: `kanji/${kanji._id}`}">
          <div class="kanji">{{ kanji.kanji }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script scoped>
import KanjiService from "../KanjiService";
import HeaderWithBtn from '../components/HeaderWithBtn';

export default {
  components: {
    HeaderWithBtn
  },
  data() {
    return {
      N5Kanji: []
    };
  },
  async created() {
    await KanjiService.getKanji()
      .then(response => {
        this.N5Kanji = response;
      })
      .catch(err => {
        window.console.log(err);
      });
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.kanjiBtn {
  width: 16vw;
  height: 16vw;
  background-color: #d5d5d5;
  border: #2b2626 solid 1px;
}
.kanji {
  color: #2b2626;
  font-size: 12vw;
}
#kanjiContainer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8vw;
  width: fit-content;
  position: relative;
  margin-top: 6rem;
  margin-left: auto;
  margin-right: auto;
}

#container {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100vw;
  background-color: #f5f2ed;
}

#header-sml {
  float: left;
  color: #2b2626;
  margin-left: 2rem;
  margin-top: 2rem;
}

/* Smartphones */
@media screen and (max-width: 500px) {
}
/* Tablets & Small Laptops */
@media screen and (min-width: 501px) and (max-width: 768px) {
  .kanjiBtn {
    width: 10vw;
    height: 10vw;
  }
  .kanji {
    font-size: 7vw;
  }
  #kanjiContainer {
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 4vw;
    margin-left: 9vw;
    margin-right: 9vw;
  }
}
/* Desktops & Laptops */
@media screen and (min-width: 769px) and (max-width: 1170px) {
  .kanjiBtn {
    width: 6vw;
    height: 6vw;
  }
  .kanji {
    font-size: 4vw;
  }
  #kanjiContainer {
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 2.5vw;
  }
}
/* Widescreens */
@media screen and (min-width: 1171px) {
  .kanjiBtn {
    width: 4rem;
    height: 4rem;
  }
  .kanji {
    font-size: 3rem;
  }
  #kanjiContainer {
    grid-template-columns: repeat(13, 1fr);
    grid-gap: 1.5rem;
    margin-top: 5rem;
  }
  #header-sml {
    margin-left: 6rem;
    margin-top: 2rem;
  }
}
</style>