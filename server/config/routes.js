const main = require("../controllers/main.js");

module.exports = function(app) {

  app.get("/", function(req, res) {
    main.index(req, res);
  });

  app.get("/userAll", function(req, res)  {
    main.getAll(req, res);
  });

  app.post("/user/login", function(req, res) {
    main.getOne(req, res);
  });

  app.post("/user/register", function(req, res) {
    main.new(req, res);
  });

  app.put("/user/update", function(req, res) {
    main.update(req, res);
  });

  app.delete("/user/:id", function(req, res) {
    main.delete(req, res);
  });
}
