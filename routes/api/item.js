const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");
const rentedController = require("../../controllers/rentedController")
const userController = require("../../controllers/userController")


  router.route("/user/:id")
  .get(userController.getUser)

  router.route("/item")
  .post(itemsController.createItem)
  .get(itemsController.findAll);


  router.route("/item/:userId")
  .get(itemsController.findByUserId)

  router.route("/item/:term")
  .get(itemsController.findByTerm);

  router.route("/:term")
  .get(itemsController.findByTerm);

  router.route("/rented")
  .post(rentedController.createRented)
  
  router.route("/rentals/:itemId")
  .get(rentedController.findByRentals);



  

  

module.exports = router;