// controllers/itemController.js
const Item = require("../models/ItemModel");
const multer = require("multer");

// Set up Multer storage for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/itemImage");
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueFilename);
    //cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const addItem = async (req, res) => {
  const { itemCode } = req.body;

  try {
    // Check if itemCode already exists
    const existingItem = await Item.findOne({ itemCode });

    if (existingItem) {
      // Duplicate key error, itemCode must be unique
      return res.status(400).json({ error: "Item Code must be unique" });
    }
    const newItem = new Item(req.body);
    console.log(req.file);
    // if (req.file) {
    //newItem.itemImage = `./public/itemImage/${req.file.filename}`; // Adjust the path accordingly
    //   newItem.itemImage = req.file.filename;
    // }
    if (req.file) {
      newItem.itemImage = `./public/itemImage/${req.file.filename}`;
    }
    const savedItem = await newItem.save();

    return res.status(201).json(savedItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    // Map MongoDB '_id' to 'id' for MUI DataGrid
    const formattedItems = items.map((item) => ({
      ...item._doc,
      id: item.itemCode,
    }));
    console.log(formattedItems);
    res.json(formattedItems);
  } catch (error) {
    console.error(error);

    // Check for specific MongoDB connection errors
    if (error.name === 'MongoServerSelectionError') {
      return res.status(500).json({ error: 'MongoDB connection error' });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const updateItemById = async (req, res) => {
//   const itemId = req.params.id;
//   try {
//     // Exclude fields you want to remove from the req.body object
//     const {  itemCode, itemName, ...updatedFields } = req.body;

//     if (req.file) {
//       // A new picture is provided, so we need to delete the old picture first
//       const existingItem = await Item.findById(itemId);
//       if (existingItem && existingItem.itemImage) {
//         // Delete the old picture
//         const fs = require('fs');
//         const path = `./public/itemImage/${existingItem.itemImage}`;
//         fs.unlinkSync(path); // Synchronously delete the file

//         // Update the picture field with the new filename
//         updatedFields.itemImage = req.file.filename;
//       }
//     }

//     const updatedItem = await Item.findByIdAndUpdate(itemId, updatedFields, { new: true });

//     if (!updatedItem) {
//       return res.status(404).json({ error: 'Item not found' });
//     }

//     res.json(updatedItem);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const updateItemByCode = async (req, res) => {
  const itemCode = req.params.code; // Assuming the itemCode is part of the URL params
  try {
    // Exclude fields you want to remove from the req.body object
    const { itemName, ...updatedFields } = req.body;

    if (req.file) {
      // A new picture is provided, so we need to delete the old picture first
      const existingItem = await Item.findOne({ itemCode });

      if (existingItem && existingItem.itemImage) {
        // Delete the old picture
        const fs = require('fs');
        const path = `./public/itemImage/${existingItem.itemImage}`;
        fs.unlinkSync(path); // Synchronously delete the file

        // Update the picture field with the new filename
        updatedFields.itemImage = req.file.filename;
      }
    }

    const updatedItem = await Item.findOneAndUpdate({ itemCode }, updatedFields, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId; // Assuming the itemId is in the request parameters
    const item = await Item.findOne({ itemCode: itemId });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Map MongoDB '_id' to 'id' for consistency with MUI DataGrid
    const formattedItem = {
      ...item._doc,
      id: item.itemCode,
    };

    res.json(formattedItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const updateMinStockQty = async (req, res) => {
  const { itemCode } = req.params;
  const { minStockQty } = req.body;

  try {
    // Check if item with the given itemCode exists
    const item = await Item.findOne({ itemCode });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Update the minStockQty
    item.minStockQty = minStockQty;

    // Save the updated item
    const updatedItem = await item.save();

    return res.json(updatedItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};




module.exports = {
  addItem,
  upload, // Multer instance for image uploads
  getAllItems,
  updateItemByCode,
  getItemById,
  updateMinStockQty,
};
