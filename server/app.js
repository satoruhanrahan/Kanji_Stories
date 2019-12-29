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

//Middleware
app.use(express.json());
app.use(cors());
//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/kanji', kanjiRoute);

//Listen to server
app.listen(3000)