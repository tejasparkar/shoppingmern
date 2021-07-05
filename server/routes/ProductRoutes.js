const express = require('express');
const { getProducts, getProduct } = require('../controllers/productsController')
const router = express.Router();


//Get Route for fetching all Products
router.route('/products').get(getProducts);

//Single Product fetching Route

router.route('/product/:id').get(getProduct)

module.exports = router;