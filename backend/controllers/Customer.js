const Customer = require("../models/Customer");
// Create a new customer
const createCustomer = async (req, res) => {
  try {
    // Check if email already exists
    const existingEmail = await Customer.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Check if customer code already exists
    const existingCustomerCode = await Customer.findOne({
      customerCode: req.body.customerCode,
    });
    if (existingCustomerCode) {
      return res.status(400).json({ error: "Customer Code already exists" });
    }

    // If neither email nor customer code exists, save the data
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    //const customers = await Customer.find();
    const customersWithSalePayments = await Customer.find().populate(
      "salePayments"
    );
    res.status(200).json(customersWithSalePayments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.customerId;

    // Find the customer by ID and populate the salePayments array
    const customerWithSalePayments = await Customer.findById(
      customerId
    ).populate("salePayments");

    if (!customerWithSalePayments) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(customerWithSalePayments);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,

  getCustomerById,
};
