const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const { errorFunction } = require("./utils/utils");

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Servidor iniciado na porta ${PORT}`));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
