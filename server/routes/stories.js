const router = require('express').Router();
const mongodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
// const verify = require('../verifyToken');

//get stories
router.get('/', async (req, res) => {
  // const stories = 
  await loadStories()
    .then((stories) => {
      res.send(stories);
    })
    .catch((err) => {
      res.send(err);
    });
});
console.log("testing", process.env)
//change user's story for specific kanji
router.post('/use', async (req, res) => {
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
router.post('/insert', async (req, res) => {
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
async function loadStories() {
  try {
    const client = await mongodb.MongoClient.connect("mongodb+srv://satoruhanrahan:ygshP%24_ubC%26Ee3a@cluster0-l7ajy.gcp.mongodb.net/users?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      function (err, client) {
        if (err) {
          console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
        }
        console.log('Connected...');
        console.log(client.db('KanjiStories').collection('stories').find({}).toArray())
      });
    return client.db('KanjiStories').collection('stories').find({}).toArray();
  } catch (err) {
    return err;
  }
}

module.exports = router;