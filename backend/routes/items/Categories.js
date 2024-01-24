// categoryRouter.js
const express = require('express');
const  categoryController = require('../../controllers/items/Categories'); // Adjust the path accordingly

const router = express.Router();

// Define routes
router.post('/dashboard/createcategory',categoryController.createCategory);
router.get('/dashboard/getCategories', categoryController.getCategories);

module.exports = router;
