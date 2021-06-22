const mongoose = require('mongoose');

const reviewsSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    ratings : {
        type : Number,
        required : true,
    },
    comment : {
        type : String,
        required : true,
    }

},{timestamps: true})

const productSchema = mongoose.Schema({
    User : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    name : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true,    
    },
    brand : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    reviews : [reviewsSchema],
    ratings : {
        type : Number,
        required : true,
    },
    noOfReviews : {
        type : Number,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    countInStock : {
        type : Number,
        required : true,
    }
})

const Product = mongoose.model('Product',productSchema);
module.exports = Product;