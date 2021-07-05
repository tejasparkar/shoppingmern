const Products = require('../models/ProductModel')
const asyncHandler = require('express-async-handler')

const getProducts = asyncHandler(
    async (req, res) => {
        const products = await Products.find({});
        res.json(products);
    });


const getProduct = asyncHandler(
    async (req, res) => {
        const product = await Products.findById(req.params.id);
        product ? res.json(product) : res.status(404).json({ message: "Product not found" })
    }
);

module.exports = { getProducts, getProduct }