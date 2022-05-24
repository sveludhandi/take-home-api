module.exports = (app) => {
    const App = require("../controllers/app.controller.js");
  
    app.post("/create", App.create);
    app.get("/summary/:summaryId", App.find);
    app.get("/all", App.findAll);
    app.put("/summary/:summaryId", App.update);
    app.delete("/summary/:summaryId", App.delete);
    app.delete("/all", App.deleteAll);

  };