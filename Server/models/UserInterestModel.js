const mongoose = require("mongoose");

const userInterestSchema = new mongoose.Schema({
  interestName: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
});

const UserInterest = mongoose.model("UserInterest", userInterestSchema);

module.exports = UserInterest;
