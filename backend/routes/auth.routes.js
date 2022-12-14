const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @description SignUp route
   */
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicate,
    ],
    controller.signup
  );

  /**
   * @description SignIn route
   */
  app.post("/api/auth/signin", controller.signin);
};