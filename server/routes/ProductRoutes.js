const express = require('express');
const Products = require('../models/ProductModel')
const asyncHandler = require('express-async-handler')
const router = express.Router();


//Get Route for fetching all Products
router.get('/products', asyncHandler(
    async (req, res) => {
        const products = await Products.find({});
        res.json(products);
    })
);

//Single Product fetching Route

router.get('/product/:id', asyncHandler(
    async (req, res) => {
        const product = await Products.findById(req.params.id);
        product ? res.json(product) : res.status(404).json({message: "Product not found"})
    }
))

module.exports = router;