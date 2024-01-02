const express = require('express');
const router = express.Router();
const  supplierController  = require('../controllers/Supplier');

// Define routes
router.get('/search', supplierController.searchByNameSupplier);
router.post('/createSupplier', supplierController.createSupplier);
router.get('/suppliers', supplierController.getAllSuppliers);
//router.get('/api/suppliers/:id', supplierController.getSupplierById);
router.get('/supplier/:supplierCode', supplierController.getSupplierByCode);
router.put('/updateSupplier/:supplierCode', supplierController.updateSupplier);
router.delete('/deleteSupplier/:supplierCode', supplierController.deleteSupplierByCode);
router.post('/deleteSuppliersByCodes', supplierController.deleteSuppliersByCodes);

module.exports = router;
