const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const templateSchema = new Schema({
  userId: { type: String, required: [true] },
  name: { type: String, required: [true] },
  description: { type: String },
  createdTime: { type: Number, required: [true] },
  widgets: { type: Array, default: [] },
});

// Schema to model.
const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
