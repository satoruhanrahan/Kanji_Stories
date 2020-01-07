import axios from 'axios';

let url = 'http://localhost:3000/api/stories';

const state = {
  stories: localStorage.getItem('stories') || null
};

const getters = {
  getStories(state) {
    return state.stories;
  }
};

const actions = {
  retrieveStories(context) {
    axios.get(url)
      .then(response => {
        const stories = response.data;
        localStorage.setItem('stories', JSON.stringify(stories));
        context.commit('retrieveStories', JSON.stringify(stories));
      })
      .catch(error => {
        window.console.log(error)
        return error;
      });
  },
  useStory(context, data) {
    axios.post(url+'/use',  
      { userID: data.userID, oldStoryID: data.oldStoryID, newStoryID: data.newStoryID })
      .then((response) => {
        const stories = response.data;
        localStorage.setItem('stories', JSON.stringify(stories));
        context.commit('retrieveStories', JSON.stringify(stories));
      })
      .catch(error => {
        window.console.log(error)
      });
  },
  insertStory(context, data) {
    axios.post(url+'/insert',  
      { story: data.newStory, kanjiID: data.kanjiID, creator: data.creator, userID: data.userID, makePublic: data.makePublic })
      .then((response) => {
        const stories = response.data;
        localStorage.setItem('stories', JSON.stringify(stories));
        context.commit('retrieveStories', JSON.stringify(stories));
        const newStory = stories.find(story => story.story.localeCompare(data.newStory) == 0)
        if(newStory) {
          localStorage.setItem('currentStory', JSON.stringify(newStory));
          return newStory._id;
        }
      })
      .catch(error => {
        return error;
      });
  }
};

const mutations = {
  retrieveStories(state, stories) {
    state.stories = stories;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}