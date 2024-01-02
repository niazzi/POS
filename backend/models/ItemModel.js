// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemImage: { type: String ,
         required: false, // Mark the picture field as required
},
     itemCode: { type: String, unique: true },
    itemName: { type: String },
    category: { type: String },
    unit: { type: String },
    purchasePrice: { type: Number },
    salePrice: { type: Number },
    wholesalePrice: { type: Number },
    minWholesaleQty: { type: Number },
    minStockQty: { type: Number },
    stockLocation: { type: String },
    openingQtyStock: { type: Number },
    date: { type: Date },
    description: { type: String },
  });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
