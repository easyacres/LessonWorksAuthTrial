const router = require("express").Router();
const lessonmainRoutes = require("./lessonmain");

// Lesson routes
router.use("/lessonmain", lessonmainRoutes);

module.exports = router;
