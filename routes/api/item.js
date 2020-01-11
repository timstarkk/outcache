const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");


router.route("/item")
  .post(itemsController.create)
  .get(itemsController.findAll);

// router.route("/:term")
//   .get(itemsController.findByTerm);

// router.route("/getAll")
//   .get(itemsController.findAll);



// Matches with "/api/books"
// router.route("/")
//   .get(booksController.findAll)
//   .post(booksController.create);

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;