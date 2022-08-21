const express = require("express");
const routes = express.Router();
const EventsController = require("../controllers/eventsController");
const LoginController = require("../controllers/loginController");

// Eventos
routes.get("/calendar", EventsController.read);
routes.post("/calendar", EventsController.create);
routes.put("/calendar/:id", EventsController.update);
routes.delete("/calendar/:id", EventsController.remove);

// Login
routes.get("/", LoginController.read);
routes.post("/", LoginController.create);

module.exports = routes;
