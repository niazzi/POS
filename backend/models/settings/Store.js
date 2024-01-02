const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: String,
  city: String,
  region: String,
  postalCode: String,
  country: {
    code: String,
    label: String,
    phone: String,
  },
  
  storeCode: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (value) {
        // Check if the value contains any spaces
        return !/\s/.test(value);
      },
      message: "Store code must not contain spaces",
    },
  },
  description: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
