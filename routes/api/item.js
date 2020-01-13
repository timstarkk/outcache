const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");


  router.route("/item")
  .post(itemsController.create);

  router.route("/item/:userId")
  .get(itemsController.findByUserId)

  router.route("/:term")
  .get(itemsController.findByTerm);
  

module.exports = router;