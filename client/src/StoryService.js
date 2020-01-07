import store from './store';

class StoryService {
  static retrieveStories() {
    try {
      store.dispatch('retrieveStories')
    } catch (err) {
      window.console.log(err);
    }
  }
  static getStoryByKanji(kanjiID) {
    //get user ID
    const userID = store.getters.getUserID;
    //get stories
    const stories = JSON.parse(store.getters.getStories);
    //find user's story
    let storyObj = stories.find(story => story.userIDs.includes(userID) && story.kanjiID === kanjiID);
    //find default story if user's story not found
    if (!storyObj) 
      storyObj = stories.find(story => story.kanjiID === kanjiID);
    //save as current story
    localStorage.setItem('currentStory', JSON.stringify(storyObj));
    return storyObj.story;
  }
  static getStoryByID(storyID) {
    const stories = JSON.parse(store.getters.getStories);
    const storyObj = stories.find(story => story._id === storyID);
    return storyObj;
  }
  static getPublicStories(kanjiID) {
    //get stories
    const stories = JSON.parse(store.getters.getStories);
    //filter public stories
    const currentStory = JSON.parse(localStorage.getItem("currentStory"));
    let storyObjs = stories.filter(story =>
      story.public == true
      && story.kanjiID == kanjiID
      && story.story != currentStory.story);
    return storyObjs;
  }
  static useStory(newStoryID) {
    //get user ID
    const userID = store.getters.getUserID;
    //get old story
    const oldStory = JSON.parse(localStorage.getItem("currentStory"));
    const data = { userID: userID, oldStoryID: oldStory._id, newStoryID: newStoryID };
    store.dispatch('useStory', data)
  }
  static update(oldStoryID, newStory, makePublic, kanjiID) {
    const userID = store.getters.getUserID;
    const username = localStorage.getItem("username");
    const insertData = { newStory: newStory, kanjiID: kanjiID, creator: username, userID: userID, makePublic: makePublic };
    store.dispatch('insertStory', insertData);
    //new story is now the current story
    const currentStory = localStorage.getItem('currentStory');
    const useStoryData = { userID: userID, oldStoryID: oldStoryID, newStoryID: currentStory._id };
    store.dispatch('useStory', useStoryData);
  }
}

export default StoryService;