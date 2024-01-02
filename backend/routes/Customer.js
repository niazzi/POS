const express = require("express");
const router = express.Router();
const customerController = require("../controllers/Customer");

router.post("/customers", customerController.createCustomer);
// Route to get a customer by ID
router.get("/customer/:customerId", customerController.getCustomerById);
// Get all customers
router.get("/customers", customerController.getAllCustomers);

module.exports = router;
