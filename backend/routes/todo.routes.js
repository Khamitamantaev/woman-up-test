const { authJwt } = require("../middlewares");
const controller = require("../controllers/todo.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
  * @description Create todo route
  */
  app.post("/api/todo/create", [authJwt.verifyToken], controller.create);

  /**
  * @description Delete todo route by id
  */
  app.delete("/api/todo/delete/:id", [authJwt.verifyToken], controller.delete);

  /**
  * @description Find All todo route
  */
  app.get("/api/todo/all", [authJwt.verifyToken], controller.findAll)

  /**
  * @description Find One todo route by id
  */
  app.get("/api/todo/:id", [authJwt.verifyToken], controller.findOne)

  /**
  * @description Update todo route by id
  */
  app.put("/api/todo/:id", [authJwt.verifyToken], controller.update)

  /**
  * @description Find All todo with pagination
  */
   app.get("/api/todo/get/page", [authJwt.verifyToken], controller.findAllWithPagination)
};