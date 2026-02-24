const jwt = require("jsonwebtoken");

// middleware to validate JWT stored in the "usertoken" cookie
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, process.env.JWT_SECRET, (err, payload) => {
    if (err) { 
      // token missing / invalid – client is not authorized
      res.status(401).json({verified: false});
    } else {
      // token is valid – allow request to continue
      next();
    }
  });
}

