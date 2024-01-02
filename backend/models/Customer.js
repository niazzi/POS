const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  salePayments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SalePayment',
    },
  ],
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
  country: String,
  customerCode: {
    type: String,
    unique: true,
    required: true,
  },
  note: String,
});
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;