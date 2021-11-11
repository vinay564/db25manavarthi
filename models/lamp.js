const mongoose = require("mongoose");
const LampSchema = mongoose.Schema({
  lamp_type: String,
  duration: Number,
  cost: Number,
});
module.exports = mongoose.model("Lamp", LampSchema);
