const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");
const rentedController = require("../../controllers/rentedController")
const userController = require("../../controllers/userController")


  router.route("/user/:id")
  .get(userController.getUser)

  router.route("/item")
  .post(itemsController.createItem)
  .get(itemsController.findAll);

  router.route("/search/:term/:zip")
  .get(itemsController.findByTerm);

// router.route("/zip/:zipCode")
//   .get(itemsController.findByZip);

  router.route("/item/:userId")
  .get(itemsController.findByUserId)

  router.route("/rented")
  .post(rentedController.createRented)
  
  router.route("/rentals/:itemId")
  .get(rentedController.findByRentals);

  router.route("/rentalApprove")
  .post(rentedController.approveRental);



  

  

module.exports = router;