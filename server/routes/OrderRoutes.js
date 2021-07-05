const express = require('express');
const { addOrderItem , getOrderById , updateOrderPaid , getMyOrders } = require('../controllers/ordersController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

//create new order

router.route('/').post(protect, addOrderItem)
//get my orders

router.route('/myorders').get(protect,getMyOrders);

//get order by Id

router.route('/:id').get(protect, getOrderById)

//update order 
router.route('/:id/pay').put(protect,updateOrderPaid);



module.exports = router;

