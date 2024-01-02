const express = require('express');
const router = express.Router();
const  storeController  = require('../../controllers/settings/Store');
// Define routes
router.post('/createstore', storeController.createStore);
router.get('/stores', storeController.getAllStores);
router.get('/store/:storeCode', storeController.getStoreByCode);
router.put('/updatestore/:storeCode', storeController.updateStore);
router.delete('/deletestore/:storeCode', storeController.deleteStoreByCode);



module.exports = router;