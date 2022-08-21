const mongoose = require("mongoose");
const uri = process.env.MONGO_URL;
const connection = mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = connection;
