const App = require("../model/app.model.js");

// Adds new Game Summary to database
module.exports.create = (req, res) => {
  const gameSummary = new App({
    date: req.body.date,
    mode: req.body.mode,
    side: req.body.side,
    champion: req.body.champion,
    victory: req.body.victory,
    summary: req.body.summary
  });
  gameSummary.save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occurred",
      });
    });
};

// Find a single Game Summary with correct summaryId
module.exports.find = (req, res) => {
  App.findById(req.params.summaryId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "summary not found with id " + req.params.summaryId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "summary not found with id " + req.params.summaryId,
        });
      }
      return res.status(500).send({
        message: "could not find summary with id " + req.params.summaryId,
      });
    });
};

// Retrieve all Game Summaries from the database.
module.exports.findAll = (req, res) => {
  App.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "could not retrieve all summaries",
      });
    });
};

// Update a Game Summary using summaryId
module.exports.update = (req, res) => {
  App.findByIdAndUpdate(
    req.params.summaryId,
    {
      date: req.body.data,
      side: req.body.side,
      champion: req.body.champion,
      victory: req.body.victory,
      summary: req.body.summary
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Summary not found with id " + req.params.summaryId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "id not found " + req.params.summaryId,
        });
      }
      return res.status(500).send({
        message: "could not delete summary with id " + req.params.summaryId,
      });
    });
};

// Delete specific summary using summaryId
module.exports.delete = (req, res) => {
  App.findByIdAndRemove(req.params.summaryId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "id not found" + req.params.summaryId,
        });
      }
      res.send({ message: "Successfully deleted" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "id not found " + req.params.summaryId,
        });
      }
      return res.status(500).send({
        message: "could not delete summary with id " + req.params.summaryId,
      });
    });
};

//Deletes all summaries within database
module.exports.deleteAll = (req, res) => {
  App.deleteMany()
    .then(() => {
      res.send("All summaries successfully deleted")
    })
    .catch(() => {
      return res.status(500).send({
        message: "Error while deleting summaries"
      });
    });

};