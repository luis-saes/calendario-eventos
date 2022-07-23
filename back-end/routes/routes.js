const express = require("express");
const routes = express.Router();
const EventsController = require("../controllers/eventsController");

routes.get("/calendar", EventsController.create);

module.exports = routes;
