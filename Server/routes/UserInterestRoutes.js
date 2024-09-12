const express = require("express");
const {
  processData,
  getAllInterests,
} = require("../controllers/UserInterestControllers");
const router = express.Router();

// Route to process data
router.post("/process-data", processData);

// Route to get all interests
router.get("/interests", getAllInterests);

module.exports = router;
