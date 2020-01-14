const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");
const rentedController = require("../../controllers/rentedController")


router.route("/item")
  .post(itemsController.createItem)
  .get(itemsController.findAll);

router.route("/item/:term")
  .get(itemsController.findByTerm);

// router.route("/:term")
//   .get(itemsController.findByTerm);

// router.route("/getAll")
//   .get(itemsController.findAll);

router.route("/item/:userId")
  .get(itemsController.findByUserId)

router.route("/rented")
  .post(rentedController.createRented);

  

module.exports = router;