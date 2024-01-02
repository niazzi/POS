const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
  salePayment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SalePayment',
    required: true,
  },
  refundedItems: [
    {
      itemCode: String,
      itemName: String,
      salePrice: Number,
      quantity: Number,
      total: Number,
    },
  ],
  refundedTotal: Number,
  refundNumber: {
    type: String,
    //unique: true,
  },
  createdAt: { type: Date, default: Date.now },
  // Add other refund-related fields if needed
});

const Refund = mongoose.model('Refund', refundSchema);

module.exports = Refund;
