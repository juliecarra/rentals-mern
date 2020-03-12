//jwt configuration
const jwt = require("jsonwebtoken");

const middleware = (req, res, next) => {
  const token = req.header("x-auth-token"); //request token from header

  if (!token) {
    return res.status(401).json({ message: "no token, authorization denied" }); //if there is no token and the route is protected by the middleware then, the access is denied
  } else {
    try {
      //if there is a valid token, it will be decoded and passed to the user
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;

      next(); //move on
    } catch (err) {
      res.status(401).json({ msg: "token is not valid" }); //if the token is not valid then, it will throw an error
    }
  }
};

module.exports = middleware;
