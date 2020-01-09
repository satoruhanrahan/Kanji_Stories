const router = require('express').Router();
const mongodb = require('mongodb');
const verify = require('../verifyToken');

router.get('/', verify, async (req, res) => {
  const N5kanji = await loadKanjiCollection()
    .then(() => {
      res.send(await N5kanji.find({}).toArray());
    })
    .catch(function (err) {
      res.send(err);
    })
});

//Connect to DB
async function loadKanjiCollection() {
  try {
    const client = await mongodb.MongoClient.connect(process.env.DB_CONNECT,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    return client.db('KanjiStories').collection('N5Kanji');
  } catch (err) {
    return err;
  }
}

module.exports = router;