const products = require('../server/data/products')
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/config');
const productRoutes = require('./routes/ProductRoutes');
const userRoutes = require('./routes/UserRoutes');
const orderRoutes = require('./routes/OrderRoutes')
const {errorHandler} = require('./middleware/ErrorMiddleware')
dotenv.config();
//Connection to MongoDB
connectDb();


const app = express();
app.use(express.json()); // Middleware Body Parser
app.use(cors())

app.get('/', (req, res) => {
    res.send("Welcome to Node Server")
});

app.use('/api', productRoutes);

app.use('/api/user', userRoutes);

app.use('/api/orders',orderRoutes)

app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID);
})
app.use(errorHandler)

const PORT = 8080;
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server Running on ${process.env.NODE_ENV} Mode on Port ${process.env.PORT}`)
})