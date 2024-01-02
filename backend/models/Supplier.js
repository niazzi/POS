const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
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
  //  country: {
  //   code: {
  //     type: String,
  //     required: true,
  //   },
  //   label: {
  //     type: String,
  //     required: true,
  //   },
  //   phone: {
  //     type: String,
  //     required: true,
  //   },
  // },
  supplierCode: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (value) {
        // Check if the value contains any spaces
        return !/\s/.test(value);
      },
      message: "Supplier code must not contain spaces",
    },
  },
  supplierCodes: [
    {
      type: String,
    },
  ],
  note: String,
});

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
