const router = require('express').Router();
const mongodb = require('mongodb');
const verify = require('../verifyToken');

router.get('/', verify, async (req, res) => {
  const N5kanji = await loadKanjiCollection();
  res.send(await N5kanji.find({}).toArray());
});

//Connect to DB
async function loadKanjiCollection() {
  const client = await mongodb.MongoClient.connect(process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  return client.db('KanjiStories').collection('N5Kanji');
}

module.exports = router;