const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
  date: String,
  mode: String,
  side: String,
  champion: String,
  victory: Boolean,
  summary: String
});

module.exports = mongoose.model("App", AppSchema);