const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to db!')
);
//Import Routes
const authRoute = require('./routes/auth');
const kanjiRoute = require('./routes/kanji');
const storiesRoute = require('./routes/stories');

//Middleware
app.use(express.json());
app.use(cors());
//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/kanji', kanjiRoute);
app.use('/api/stories', storiesRoute);

//Handle Production
if(process.env.NODE_ENV === 'production') {
  //Static folder
  app.use(express.static(__dirname + '/public/'));

  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;
//Listen to server
app.listen(port, () => console.log(`Server started on port ${port}`))