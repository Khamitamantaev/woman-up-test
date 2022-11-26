const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config.js");

/**
 * @module authJwt
 * @description Проверяем токен при запросе
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
verifyToken = (req, res, next) => {

  try {
    let token = req.get('authorization')

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    /**
     * @description Если это токен Bearer, то убираем 7 символов, для получения
     */
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    /**
     * @description Проверка токена происходит здесь
     * @param {String} token - проверяемый токен
     * @param {String} authConfig.access_secret - секретный ключ
     */
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