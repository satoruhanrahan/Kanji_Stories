const router = require('express').Router();
const mongodb = require('mongodb');
// const verify = require('../verifyToken');

router.get('/', async (req, res) => {
  const stories = await loadStories();
  res.send(stories);
});

//changed used story for specific kanji
router.post('/', async (req, res) => {
  const client = await mongodb.MongoClient.connect(process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  const storyCollection = client.db('KanjiStories').collection('stories');
  //remove user id from old story data
  await storyCollection.updateOne(
    { _id: mongodb.ObjectId(req.body.oldStoryID) },
    { $pull: { userIDs: req.body.userID } });
  //add user id to new story data
  await storyCollection.updateOne(
    { _id: mongodb.ObjectId(req.body.newStoryID) },
    { $addToSet: { userIDs: req.body.userID } });
  const stories = await storyCollection.find({}).toArray();
  res.send(stories);
});


//Connect to DB and get stories
async function loadStories() {
  const client = await mongodb.MongoClient.connect(process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  return client.db('KanjiStories').collection('stories').find({}).toArray();
}

module.exports = router;