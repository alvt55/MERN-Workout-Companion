const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// TODO: type checking
const workoutSchema = new Schema(
  {
    date: {
      // will be stored in ISO String UTC (BSON)
      type: Date,
      required: [true, "Enter a valid date"],
    },
    day: {
      type: String,
      required: [true, "Enter a valid day"],
    },
    exercises: {
      type: Array,
      required: true,
    },
    sessionuser: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// creates a collection of "sessions"
module.exports = mongoose.model("session", workoutSchema);
