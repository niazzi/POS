const Customer = require('../models/Customer'); // Adjust the path as needed
const Payment = require('../models/SalePayment');

// Controller to save a payment
const SalePayment = async (req, res) => {
  try {
    // Get the count of existing sale entries
    const count = await Payment.countDocuments();

    // Generate a unique receipt number
    const receiptNumber = count + 1;
    const { itemDetails, billTotal, customer } = req.body;

    // Check if the customer _id is provided
    if (customer && customer._id) {
      // Check if the customer exists
      const existingCustomer = await Customer.findById(customer._id);
      if (!existingCustomer) {
        console.warn('Warning: Customer not found, but sale payment will be created');
      } else {
        // Create a new payment record
        const payment = new Payment({
          receiptNumber,
          itemDetails,
          billTotal,
          customer: customer._id,
          // Add other payment-related fields if needed
        });

        // Save the payment to the database
        await payment.save();

        // Update the customer's salePayments array
        existingCustomer.salePayments.push(payment._id);
        await existingCustomer.save();

        res.status(201).json({ message: 'Payment saved successfully', payment });
      }
    } else {
      // If customer _id is not provided, proceed with creating the payment without associating it with a customer
      const payment = new Payment({
        receiptNumber,
        itemDetails,
        billTotal,
        // Add other payment-related fields if needed
      });

      // Save the payment to the database
      await payment.save();

      res.status(201).json({ message: 'Payment saved successfully', payment });
    }
  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMostRecentPayment = async (req, res) => {
    try {
      const mostRecentPayment = await Payment.findOne().sort({ createdAt: -1 });
  
      if (mostRecentPayment) {
        // Extract only the required fields
        const { itemDetails, billTotal } = mostRecentPayment;
        const extractedData = {
          itemDetails: itemDetails.map(item => ({
            itemCode: item.itemCode,
            itemName: item.itemName,
            salePrice: item.salePrice,
            quantity:item.quantity,
            total: item.total,
          })),
          billTotal: billTotal,
        };
  
        res.json(extractedData);
      } else {
        res.status(404).json({ error: 'No payments found' });
      }
    } catch (error) {
      console.error('Error getting most recent payment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
  // const getAllSalePayments = async (req, res) => {
  //   try {
  //     const salePayments = await Payment.find().populate('customer');
  //     res.status(200).json({ salePayments });
  //   } catch (error) {
  //     console.error('Error getting sale payments:', error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // };
  const getAllSalePayments = async (req, res) => {
    try {
      const salePayments = await Payment.find().populate('customer').populate('refund');
      res.status(200).json({ salePayments });
    } catch (error) {
      console.error('Error getting sale payments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  const getSalePaymentById = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Assuming you have a SalePayment model and it has a field named `_id`
      const salePayment = await Payment.findById(id).populate('customer').populate('refund');
  
      if (!salePayment) {
        return res.status(404).json({ error: 'Sale payment not found' });
      }
  
      res.status(200).json({ salePayment });
    } catch (error) {
      console.error('Error getting sale payment by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  
  

module.exports = {
    SalePayment,
    getMostRecentPayment,
    getAllSalePayments,
    getSalePaymentById
  };
