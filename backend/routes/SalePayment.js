const express = require('express');
const router = express.Router();
const salePaymentController = require('../controllers/SalePaymentController');

// Handle final payment
router.post('/sale-payment', salePaymentController.SalePayment);
router.get('/most-recent-payment', salePaymentController.getMostRecentPayment);
router.get('/salepayments', salePaymentController.getAllSalePayments);
router.get('/salepayment/:id', salePaymentController.getSalePaymentById);

module.exports = router;
