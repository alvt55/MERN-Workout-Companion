const jwt = require('jsonwebtoken');

require('dotenv').config()

// verifies user 
const requireAuth = (req, res, next) => {

  const authHeader = req.headers.authorization;
  const bearer = authHeader && authHeader.split(' ')[0];
  const token = authHeader && authHeader.split(' ')[1]


  if (bearer !== 'Bearer') {
    return res.status(403).json({authError: 'incorrect token format'});
  }
  

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWTSECRET, (err, decodedToken) => {
      if (err) {
        res.status(403).json({authError: 'jwt is not verified'})
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({authError: 'jwt sent to server is null'})
  }
};







module.exports = { requireAuth};