const jwt = require('jsonwebtoken');

module.exports = function auth (req,res,next){
  const token = req.headers.auth_token;
  if(!token) return res.status(401).send('Access Denied');
  try{
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}