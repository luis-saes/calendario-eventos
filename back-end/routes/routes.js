const express = require("express");
const routes = express.Router();
const EventsController = require("../controllers/eventsController");

routes.get("/calendar", EventsController.read);
routes.post("/calendar", EventsController.create);
routes.put("/calendar/:id", EventsController.update);
routes.delete("/calendar/:id", EventsController.remove);

module.exports = routes;
