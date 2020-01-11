const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");
const rentedController = require("../../controllers/rentedController")


  router.route("/item")
  .post(itemsController.createItem);

  router.route("/item/:userId")
  .get(itemsController.findByUserId)

  router.route("/:term")
  .get(itemsController.findByTerm);

  router.route("/rented")
  .post(rentedController.createRented);
  

module.exports = router;