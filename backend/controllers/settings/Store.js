const Store = require('../../models/settings/Store');


const createStore = async (req, res) => {
    try {
      // Check if email already exists
      const existingEmail = await Store.findOne({ email: req.body.email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      // Check if store code already exists
      const existingStoreCode = await Store.findOne({
        storeCode: req.body.storeCode,
      });
      if (existingStoreCode) {
        return res.status(400).json({ error: "Store Code already exists" });
      }
      // Set country to null if it doesn't exist in req.body or is explicitly set to null
      const country = req.body.country !== undefined ? req.body.country : null;
  
      // If neither email nor store code exists, save the data
      const store = new Store({ ...req.body, country });
      await store.save();
      res.status(201).json(store);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  const getAllStores = async (req, res) => {
    try {
      // Fetch all stores from the database
      const allStores = await Store.find();
  
      // Return the list of stores in the response
      res.status(200).json(allStores);
    } catch (error) {
      // Handle any errors that occur during the process
      res.status(500).json({ error: error.message });
    }
  };
  const getStoreByCode = async (req, res) => {
    try {
      // Extract the storeCode from the request parameters
      const { storeCode } = req.params;
  
      // Check if the store with the given storeCode exists in the database
      const store = await Store.findOne({ storeCode });
  
      // If the store is not found, return a 404 status with an error message
      if (!store) {
        return res.status(404).json({ error: 'Store not found' });
      }
  
      // Return the store details in the response
      res.status(200).json(store);
    } catch (error) {
      // Handle any errors that occur during the process
      res.status(500).json({ error: error.message });
    }
  };

  const updateStore = async (req, res) => {
    try {
      const { storeCode } = req.params;
      const updatedData = req.body;
  
      // Check if the updated email already exists
      if (updatedData.email) {
        const existingEmail = await Store.findOne({ email: updatedData.email, storeCode: { $ne: storeCode } });
        if (existingEmail) {
          return res.status(400).json({ error: 'Email already exists' });
        }
      }
  
      // Check if the updated store code already exists
      if (updatedData.storeCode) {
        const existingStoreCode = await Store.findOne({ storeCode: updatedData.storeCode });
        if (existingStoreCode && existingStoreCode.storeCode !== storeCode) {
          return res.status(400).json({ error: 'Store Code already exists' });
        }
      }
  
      // Update the store information
      const result = await Store.findOneAndUpdate(
        { storeCode },
        { $set: updatedData },
        { new: true }
      );
  
      if (!result) {
        return res.status(404).json({ error: 'Store not found' });
      }
  
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error updating store:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  const deleteStoreByCode = async (req, res) => {
    try {
      // Extract the storeCode from the request parameters
      const { storeCode } = req.params;
  
      // Find and delete the store from the database
      const deletedStore = await Store.findOneAndDelete({ storeCode });
  
      // Check if the store was found and deleted
      if (!deletedStore) {
        return res.status(404).json({ error: 'Store not found' });
      }
  
      // Return a success message in the response
      res.status(200).json({ message: 'Store deleted successfully' });
    } catch (error) {
      // Handle any errors that occur during the process
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    createStore,
    getAllStores,
    getStoreByCode,
    updateStore,
    deleteStoreByCode
  };