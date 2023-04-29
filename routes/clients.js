//Dependencies
const express = require("express");
const router = express.Router();
const clientsController = require("../controllers/clients");

//Client routes
router.get("/getClient", clientsController.getClient);

//Enables user to create client
router.post("/createClient", clientsController.createClient);

//Enables user to delete client. In controller, uses POST model to delete client from MongoDB collection
router.delete("/deleteClient/:id", clientsController.deleteClient);

//Exports
module.exports = router;
