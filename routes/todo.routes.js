const { authJwt } = require("../middlewares");
const controller = require("../controllers/todo.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/todo/create", [authJwt.verifyToken], controller.create);
  app.delete("/api/todo/delete/:id", [authJwt.verifyToken], controller.delete);
  app.get("/api/todo/all", [authJwt.verifyToken], controller.findAll)
  app.get("/api/todo/:id", [authJwt.verifyToken], controller.findOne)
  app.put("/api/todo/:id", [authJwt.verifyToken], controller.update)
};