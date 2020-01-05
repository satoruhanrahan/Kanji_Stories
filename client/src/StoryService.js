import store from './store';
// import kanji from './store/modules/kanji';

class StoryService {
  static retrieveStories() {
    // const stories = JSON.parse(store.getters.getStories);
    // if (!stories) {
      try {
        store.dispatch('retrieveStories')
      } catch (err) {
        window.console.log(err);
      }
    // }
  }
  static getStoryByKanji(kanjiID) {
    //get user ID
    const userID = store.getters.getUserID;
    //get stories
    const stories = JSON.parse(store.getters.getStories);
    //find user's story
    let storyObj = stories.find(story => story.userIDs.includes(userID) && story.kanjiID === kanjiID);
    //find default story if user's story not found
    if(!storyObj){
      storyObj = stories.find(story => story.kanjiID === kanjiID);
    }
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
    // const currentStory = JSON.parse(localStorage.getItem("currentStory"));
    // window.console.log(currentStory, kanjiID)
    // const data = { kanjiID: kanjiID, currentStoryID:  };
    // store.dispatch('retrievePublicStories', data)
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
    // return new Promise(function(resolve, reject) {
      //get user ID
      const userID = store.getters.getUserID;
      //get old story
      const oldStory = JSON.parse(localStorage.getItem("currentStory"));
      const data = {userID: userID, oldStoryID: oldStory._id, newStoryID: newStoryID};
      // try{
        // const response = 
        store.dispatch('useStory', data)

        // resolve(response);
      // } catch(err) {
        // reject(err);
      // }
    // });
  }
}

export default StoryService;