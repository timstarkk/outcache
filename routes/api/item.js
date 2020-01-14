const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");


router.route("/item")
  .post(itemsController.create)
  .get(itemsController.findAll);

router.route("/item/:term")
  .get(itemsController.findByTerm);

// router.route("/:term")
//   .get(itemsController.findByTerm);

// router.route("/getAll")
//   .get(itemsController.findAll);

router.route("/item/:userId")
  .get(itemsController.findByUserId)
  

module.exports = router;