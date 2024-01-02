const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const Supplier = require('../models/Supplier'); // Adjust the path based on your project structure

const createSupplier = async (req, res) => {
  try {
    // Check if email already exists
    const existingEmail = await Supplier.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Check if supplier code already exists
    const existingSupplierCode = await Supplier.findOne({
      supplierCode: req.body.supplierCode,
    });
    if (existingSupplierCode) {
      return res.status(400).json({ error: "Supplier Code already exists" });
    }
    // Set country to null if it doesn't exist in req.body or is explicitly set to null
    const country = req.body.country !== undefined ? req.body.country : null;

    // If neither email nor supplier code exists, save the data
    const supplier = new Supplier({ ...req.body, country });
    await supplier.save();
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllSuppliers = async (req, res) => {
    try {
      // Fetch all suppliers from the database
      const allSuppliers = await Supplier.find();
  
      // Return the list of suppliers in the response
      res.status(200).json(allSuppliers);
    } catch (error) {
      // Handle any errors that occur during the process
      res.status(500).json({ error: error.message });
    }
  };

//   const getSupplierById = async (req, res) => {
//     try {
//       // Extract the supplier ID from the request parameters
//       const { id } = req.params;
  
//       // Check if the supplier with the given ID exists in the database
//       const supplier = await Supplier.findById(id);
  
//       // If the supplier is not found, return a 404 status with an error message
//       if (!supplier) {
//         return res.status(404).json({ error: 'Supplier not found' });
//       }
  
//       // Return the supplier details in the response
//       res.status(200).json(supplier);
//     } catch (error) {
//       // Handle any errors that occur during the process
//       res.status(500).json({ error: error.message });
//     }
//   };

const getSupplierByCode = async (req, res) => {
    try {
      // Extract the supplierCode from the request parameters
      const { supplierCode } = req.params;
  
      // Check if the supplier with the given supplierCode exists in the database
      const supplier = await Supplier.findOne({ supplierCode });
  
      // If the supplier is not found, return a 404 status with an error message
      if (!supplier) {
        return res.status(404).json({ error: 'Supplier not found' });
      }
  
      // Return the supplier details in the response
      res.status(200).json(supplier);
    } catch (error) {
      // Handle any errors that occur during the process
      res.status(500).json({ error: error.message });
    }
  };

// updateSupplierController.js

// const updateSupplier = async (req, res) => {
//   try {
//     const { supplierCode } = req.params;
//     const updatedData = req.body;

//     // Check if the updated email already exists
//     if (updatedData.email) {
//       const existingEmail = await Supplier.findOne({ email: updatedData.email, supplierCode: { $ne: supplierCode } });
//       if (existingEmail) {
//         return res.status(400).json({ error: 'Email already exists' });
//       }
//     }

//     // Check if the updated supplier code already exists
//     if (updatedData.supplierCode) {
//         const existingSupplierCode = await Supplier.findOne({
//           supplierCode: updatedData.supplierCode,
//           _id: { $ne: mongoose.Types.ObjectId(supplierCode) } // Convert supplierCode to ObjectId
//         });
//         if (existingSupplierCode) {
//           return res.status(400).json({ error: 'Supplier Code already exists' });
//         }
//       }

//     // Update the supplier information
//     const result = await Supplier.findOneAndUpdate(
//       { supplierCode },
//       { $set: updatedData },
//       { new: true }
//     );

//     if (!result) {
//       return res.status(404).json({ error: 'Supplier not found' });
//     }

//     return res.status(200).json(result);
//   } catch (error) {
//     console.error('Error updating supplier:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// ...

// const updateSupplier = async (req, res) => {
//     try {
//       const { supplierCode } = req.params;
//       const updatedData = req.body;
  
//       // Check if the updated email already exists
//       if (updatedData.email) {
//         const existingEmail = await Supplier.findOne({ email: updatedData.email, supplierCode: { $ne: supplierCode } });
//         if (existingEmail) {
//           return res.status(400).json({ error: 'Email already exists' });
//         }
//       }
  
//       // Check if the updated supplier code already exists
//       if (updatedData.supplierCode) {
//         const existingSupplierCode = await Supplier.findOne({
//           supplierCode: updatedData.supplierCode,
//           _id: { $ne: new ObjectId(supplierCode) } // Use new keyword here
//         });
//         if (existingSupplierCode) {
//           return res.status(400).json({ error: 'Supplier Code already exists' });
//         }
//       }
  
//       // Update the supplier information
//       const result = await Supplier.findOneAndUpdate(
//         { supplierCode: new ObjectId(supplierCode) }, // Use new keyword here
//         { $set: updatedData },
//         { new: true }
//       );
  
//       if (!result) {
//         return res.status(404).json({ error: 'Supplier not found' });
//       }
  
//       return res.status(200).json(result);
//     } catch (error) {
//       console.error('Error updating supplier:', error);
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   };


// const updateSupplier = async (req, res) => {
//   try {
//     const { supplierCode } = req.params;
//     const updatedData = req.body;

//     // Check if the updated email already exists
//     if (updatedData.email) {
//       const existingEmail = await Supplier.findOne({ email: updatedData.email, supplierCode: { $ne: supplierCode } });
//       if (existingEmail) {
//         return res.status(400).json({ error: 'Email already exists' });
//       }
//     }

//     // Check if the updated supplier code already exists
//     if (updatedData.supplierCode) {
//         const existingSupplierCode = await Supplier.findOne({
//             supplierCode: updatedData.supplierCode,
//             _id: { $ne: new ObjectId(supplierCode) }
//           });
//       if (existingSupplierCode) {
//         return res.status(400).json({ error: 'Supplier Code already exists' });
//       }
//     }

//     // Update the supplier information
//     const result = await Supplier.findOneAndUpdate(
//       { _id: new ObjectId(supplierCode.toString()) }, // Ensure supplierCode is a valid ObjectId
//       { $set: updatedData },
//       { new: true }
//     );

//     if (!result) {
//       return res.status(404).json({ error: 'Supplier not found' });
//     }

//     return res.status(200).json(result);
//   } catch (error) {
//     console.error('Error updating supplier:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// updateSupplierController.js

const updateSupplier = async (req, res) => {
  try {
    const { supplierCode } = req.params;
    const updatedData = req.body;

    // Check if the updated email already exists
    if (updatedData.email) {
      const existingEmail = await Supplier.findOne({ email: updatedData.email, supplierCode: { $ne: supplierCode } });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    // Check if the updated supplier code already exists
    if (updatedData.supplierCode) {
      const existingSupplierCode = await Supplier.findOne({ supplierCode: updatedData.supplierCode });
      if (existingSupplierCode && existingSupplierCode.supplierCode !== supplierCode) {
        return res.status(400).json({ error: 'Supplier Code already exists' });
      }
    }

    // Update the supplier information
    const result = await Supplier.findOneAndUpdate(
      { supplierCode },
      { $set: updatedData },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: 'Supplier not found' });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error updating supplier:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteSupplierByCode = async (req, res) => {
  try {
    // Extract the supplierCode from the request parameters
    const { supplierCode } = req.params;

    // Find and delete the supplier from the database
    const deletedSupplier = await Supplier.findOneAndDelete({ supplierCode });

    // Check if the supplier was found and deleted
    if (!deletedSupplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }

    // Return a success message in the response
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: error.message });
  }
};


const deleteSuppliersByCodes = async (req, res) => {
  try {
    // Extract the supplierCodes from the request body
    const { supplierCodes } = req.body;

    // Check if supplierCodes is provided
    if (!supplierCodes || supplierCodes.length === 0) {
      return res.status(400).json({ error: 'No supplier codes provided for deletion' });
    }

    // Delete the suppliers with the given codes from the database
    const result = await Supplier.deleteMany({ supplierCode: { $in: supplierCodes } });

    // Check if any suppliers were found and deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'No matching suppliers found for deletion' });
    }

    // Return a success message in the response
    res.status(200).json({ message: 'Suppliers deleted successfully' });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: error.message });
  }
};

const searchByNameSupplier = async (req, res) => {
  try {
    // Extract the 'name' parameter from the request query
    const { name } = req.query;

    // Use a case-insensitive regular expression to perform the search
    const results = await Supplier.find({ name: { $regex: new RegExp(name, 'i') } });

    // Respond with the search results in JSON format
    res.json(results);
  } catch (error) {
    // Handle errors by logging and sending a 500 Internal Server Error response
    console.error('Error searching suppliers by name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





module.exports = {
  createSupplier,
  getAllSuppliers,
  //getSupplierById,
  getSupplierByCode,
  updateSupplier,
  deleteSupplierByCode,
  deleteSuppliersByCodes,
  searchByNameSupplier
};
