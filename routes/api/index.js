const router = require("express").Router();
const itemRoutes = require("./item");

// Book routes
router.use("/item", itemRoutes);

module.exports = router;