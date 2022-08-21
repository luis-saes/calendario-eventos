const mongoose = require("mongoose");
const uri =
  "mongodb+srv://admin:admin@cluster0.vob6d.mongodb.net/calendar?retryWrites=true&w=majority";
const connection = mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = connection;
