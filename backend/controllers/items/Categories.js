const Category = require("../../models/items/Categories"); // Adjust the path accordingly

const createCategory = async (req, res) => {
  try {
    const { categoryName, categoryColor, categoryCode } = req.body;

    // Check if required fields are provided
    if (!categoryName && !categoryCode) {
      return res
        .status(400)
        .json({ error: "Category Name and Category Code are required" });
    }

    if (!categoryName) {
      return res.status(400).json({ error: "Category Name is required" });
    }
    if (categoryName.length < 1 || categoryName.length > 64) {
      return res
        .status(400)
        .json({ error: "Category Name must be between 1 and 64 characters" });
    }

    if (!categoryCode) {
      return res.status(400).json({ error: "Category Code is required" });
    }

    // Check if the provided categoryCode already exists
    const existingCategory = await Category.findOne({ categoryCode });
    if (existingCategory) {
      return res.status(400).json({ error: "Category Code already exists" });
    }

    const newCategory = new Category({
      categoryName,
      categoryColor,
      categoryCode,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCategories = async (req, res) => {
  try {
    // Retrieve all categories from the database, sorted by created_at in descending order
    const categories = await Category.find().sort({ created_at: -1 });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error getting categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { createCategory, getCategories };
