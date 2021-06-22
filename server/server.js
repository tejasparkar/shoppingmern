const products = require('../server/data/products')
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/config');
const productRoutes = require('./routes/ProductRoutes')
const {errorHandler} = require('./middleware/ErrorMiddleware')
dotenv.config();
//Connection to MongoDB
connectDb();


const app = express();
app.use(cors())

app.get('/', (req, res) => {
    res.send("Welcome to Node Server")
});

app.use('/api', productRoutes);

app.use(errorHandler)

const PORT = 8080;
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server Running on ${process.env.NODE_ENV} Mode on Port ${process.env.PORT}`)
})