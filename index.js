const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3001;

require("./config/databaseConfig");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://calendario-nuvem-front.herokuapp.com/"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(routes);

app.listen(PORT);
