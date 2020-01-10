const router = require('express').Router();
const mongodb = require('mongodb');
const verify = require('../verifyToken');
const dotenv = require('dotenv');
dotenv.config();

//get stories
router.get('/', async (req, res) => {
  const result = await loadStories();
  res.send(result)
});
//change user's story for specific kanji
router.post('/use', verify, async (req, res) => {
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

//insert new story
router.post('/insert', verify, async (req, res) => {
  const client = await mongodb.MongoClient.connect(process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  const storyCollection = client.db('KanjiStories').collection('stories');
  //remove user id from old story data
  await storyCollection.insertOne(
    {
      story: req.body.story
      , kanjiID: req.body.kanjiID
      , creator: req.body.creator
      , userIDs: [req.body.userID]
      , public: req.body.makePublic
    });
  const stories = await storyCollection.find({}).toArray();
  res.send(stories);
});

//Connect to DB and get stories
function loadStories() {
  return new Promise(function (resolve, reject) {
    const MongoClient = require('mongodb').MongoClient;
    const uri = process.env.DB_CONNECT;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      if (err) reject('Error occurred while connecting to MongoDB Atlas...\n', err);
      const collection = client.db("KanjiStories").collection("stories");
      collection.find({}).toArray(function (err, result) {
        if (err) reject(err);
        client.close();
        if (result) resolve(result);
      });
    });
  });
}

module.exports = router;