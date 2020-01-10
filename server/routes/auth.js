const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {signupValidation, loginValidation} = require('../validation');
const dotenv = require('dotenv');
dotenv.config();

router.post('/signup', async (req, res) => {
  //validate data before making user
  const {error} = signupValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //Checking if the username is already in the database
  const usernameExist = await User.findOne({username: req.body.username});
  if(usernameExist) return res.status(400).send('Username already exists');

  //Checking if the email is already in the database
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send('Email already exists');
  
  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });
  try{
    await user.save();
    res.send({user: user._id});
  }catch(err){
    res.status(400).send(err);
  }
});

//Login
router.post('/login', async (req,res)=> {
  //validate data before logging in
  const {error} = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  // //Checking if the email exists
  const user = await User.findOne({email: req.body.email});
  console.log(user);
  // if(!user) return res.status(400).send('Email is not found');
  // //Password is correct
  // const validPass = await bcrypt.compare(req.body.password, user.password);
  // if(!validPass) return res.status(400).send('Invalid password');
  // //Create and assign a token
  // const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  // res.header('auth-token', token).send({ userID: user._id, username: user.username, token: token });
});

module.exports = router;