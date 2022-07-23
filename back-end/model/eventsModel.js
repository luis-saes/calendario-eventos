const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema({
  descricao: String,
  data_inicio: Date,
  data_fim: Date,
});

module.exports = mongoose.model("events", EventsSchema);
