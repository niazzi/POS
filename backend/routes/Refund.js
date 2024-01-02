const express = require('express');
const router = express.Router();

const refundController= require('../controllers/Refund');

// Define your routes
router.post('/create-sale-payment-and-refund', refundController.createSalePaymentAndRefund);
router.get('/get-refunded-items', refundController.getRefundByRefundNumber);

// Export the router
module.exports = router;
