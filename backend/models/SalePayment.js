const mongoose = require('mongoose');

const salePaymentSchema = new mongoose.Schema({
  receiptNumber: { type: String, unique: true },
  itemDetails: [
    {
      itemCode: String,
      itemName: String,
      salePrice: Number,
      quantity: Number,
      total: Number,
    },
  ],
  billTotal: Number,
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: false, // Make the customer field optional
  },
  refund: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Refund',
  },
  createdAt: { type: Date, default: Date.now }, // Add the createdAt field
  // Add other payment-related fields if needed
});

const Payment = mongoose.model('SalePayment', salePaymentSchema);

module.exports = Payment;
