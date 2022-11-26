const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
  * @description Test AllAccess public user get route
  */
  app.get("/api/test/all", controller.allAccess);

  /**
  * @description Test PrivateAccess private user get route
  */
  app.get("/api/test/user", [authJwt.verifyToken], controller.privateAccess);

  /**
  * @description Get info  user id
  * @returns {JSON} with id
  */
  app.get(
    "api/user/info",
    [authJwt.verifyToken],
    controller.getInfo
  );
};