const jwt = require('jsonwebtoken');

require('dotenv').config()

// verifies user 
const requireAuth = (req, res, next) => {

  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWTSECRET, (err, decodedToken) => {
      if (err) {
        res.status(400).json({authError: 'jwt is not verified'})
      } else {
        next();
      }
    });
  } else {
    res.status(400).json({authError: 'jwt sent to server is null'})
  }
};






module.exports = { requireAuth};