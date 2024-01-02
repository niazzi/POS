// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/ItemController');

router.post('/add-Item', itemController.upload.single('itemImage'),itemController.addItem);
router.get('/items', itemController.getAllItems);
// Update a item by ID
router.put('/items/:code', itemController.upload.single('itemImage'), itemController.updateItemByCode);
// Define the route for getting an item by ID
router.get('/items/:itemId', itemController.getItemById);
// Update minStockQty route
router.put("/updateMinStockQty/:itemCode", itemController.updateMinStockQty);


module.exports = router;
