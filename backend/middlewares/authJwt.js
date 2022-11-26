const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config.js");

verifyToken = (req, res, next) => {

  try {
    let token = req.get('authorization')

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
        
      token = token.slice(7, token.length).trimLeft();
    }

    jwt.verify(token, authConfig.access_secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;