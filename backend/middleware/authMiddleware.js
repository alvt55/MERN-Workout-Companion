const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'testingsecretchangelater', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).send({error: 'not authenticated'})
      } else {
        console.log(decodedToken, "request was authenticated");
        next();
      }
    });
  } else {
    res.status(400).send({error: 'not authenticated'})
  }
};

module.exports = { requireAuth };