const SalePayment = require('../models/SalePayment');
const Refund = require('../models/Refund');

const createSalePaymentAndRefund = async (req, res) => {
  try {
    // Get the count of existing sale entries
//     const count = await SalePayment.countDocuments();
//     const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
// const receiptNumber = `Receipt#${count + 1}-${randomPart}`;


    // Generate a unique receipt number
    // let receiptNumber;
    // do {
    //   const count = await SalePayment.countDocuments();
    //   receiptNumber = `Receipt#${count + 1}`;
    // } while (await SalePayment.findOne({ receiptNumber }));

    // Generate a unique receipt number
    const receiptNumber = await generateUniqueReceiptNumber();
    
    // Now 'receiptNumber' is guaranteed to be unique
    //console.log('Received data:', req.body); // Log the received data
    // Step 1: Create a SalePayment
    const salePayment = new SalePayment({
        receiptNumber: receiptNumber,
      itemDetails: req.body.refundedItems,
      billTotal: req.body.refundedTotal,
      // Add other fields as needed
    });

    // Save the SalePayment
    const savedSalePayment = await salePayment.save();

    // Step 2: Find the associated receipt number
    //const foundSalePayment = await SalePayment.findById(savedSalePayment._id);
    //const receiptNumber = foundSalePayment.receiptNumber;

    // Create a unique refund number (you can implement your logic here)
    // const refundNumber = generateUniqueRefundNumber();
    // const combinedRefundNumber = `${refundNumber}-${req.body.receiptNumber}`;
    const refundNumber = req.body.receiptNumber;
    const formattedRefundNumber = refundNumber;
    // Step 3: Create a Refund referencing the SalePayment and assign the receipt number
    const refund = new Refund({
      salePayment: savedSalePayment._id,
      refundedItems: req.body.refundedItems,
      refundedTotal: req.body.refundedTotal,
      refundNumber: formattedRefundNumber, // Assign the receipt number to the refund
      // Add other refund-related fields as needed
    });

    // Save the Refund
    const savedRefund = await refund.save();
    // Update the SalePayment with the reference to the Refund
    savedSalePayment.refund = savedRefund._id;
    await savedSalePayment.save();

    // Respond with success
    res.status(201).json({
      message: 'SalePayment and Refund created successfully',
      salePayment: savedSalePayment,
      refund: savedRefund,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getRefundByRefundNumber = async (req, res) => {
    try {
        
      const refundNumber = req.query.refundNumber;
      //console.log('Received refundNumber:', refundNumber);
  
      if (!refundNumber) {
        return res.status(400).json({ message: 'Refund number is required' });
      }
  
      // Find the refund by refundNumber
      const refund = await Refund.find({ refundNumber });
  
      if (!refund) {
        return res.status(404).json({ message: 'Refund not found' });
      }
  
      // Respond with the refund details
      res.status(200).json({ refund });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

// Function to generate a unique refund number (you can customize this)
const generateUniqueRefundNumber = () => {
    // Implement your logic to generate a unique refund number, such as combining date and a random string
    const datePart = new Date().toISOString().replace(/[\W_]+/g, '').substr(0, 12);
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${datePart}-${randomPart}`;
  };

  // Function to generate a unique receipt number
const generateUniqueReceiptNumber = async () => {
    let receiptNumber;
    do {
      const count = await SalePayment.countDocuments();
      receiptNumber = count + 1;
    } while (await SalePayment.findOne({ receiptNumber }));
    return receiptNumber;
  };

module.exports = {
  createSalePaymentAndRefund,
  getRefundByRefundNumber,
};
