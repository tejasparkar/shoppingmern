const express = require('express');
const router = express.Router();
const { authController, getUserProfile ,registerUser , updateUserProfile } = require('../controllers/usersController')
const protect  = require('../middleware/authMiddleware')
router.post('/login', authController); //email and password auth
router.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile); //get private route access to user profile
router.route('/').post(registerUser)
module.exports = router;