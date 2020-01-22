const router = require("express").Router();
const itemRoutes = require("./item");
// const imageRoutes = require("./image")


router.use("/item", itemRoutes);
// router.use("/image", imageRoutes);

module.exports = router;