const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema({
  login: String,
  senha: String,
});

module.exports = mongoose.model("login", EventsSchema);
