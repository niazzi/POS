const mongoose = require("mongoose");

// Define the Category schema
const categorySchema = new mongoose.Schema({
  categoryCode: {
    type: String,
    unique: true,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 64,
  },
  categoryColor: {
    type: String,
    default: "#ff5722",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: null, // Default to null as the resource is not deleted initially
  },
});

// Create the Category model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
