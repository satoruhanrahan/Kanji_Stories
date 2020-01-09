const router = require('express').Router();
const mongodb = require('mongodb');
const verify = require('../verifyToken');

router.get('/', verify, async (req, res) => {
  const N5kanji = await loadKanjiCollection();
  res.send(await N5kanji.find({}).toArray());
});

//Connect to DB
async function loadKanjiCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://satoruhanrahan:ygshP$_ubC&Ee3a@cluster0-l7ajy.gcp.mongodb.net/KanjiStories?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  return client.db('KanjiStories').collection('N5Kanji');
}

module.exports = router;