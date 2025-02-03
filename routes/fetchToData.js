const express = require("express");
const {
  fetchDataAndAddToanotherDb,
} = require("../controller/salaryController");
const router = express.Router();
router.get("/:name/:year/:month/:day/:hour", fetchDataAndAddToanotherDb);
module.exports = router;
