const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const User = require('./models/UserModel');
const Product = require('./models/ProductModel');
const Order = require('./models/OrderModel');
const products = require('./data/products');
const connectDb = require('./config/config');

dotenv.config();
connectDb();

const importData = async () => {

    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        const createUser = await User.insertMany(users);
        const adminUser = createUser[0]._id;
        const sampleData = products.map(product => {
            return { ...product, User: adminUser }
        });
        await Product.insertMany(sampleData);
        console.log("Data Imported Sucssfully");
        process.exit()
    } catch (error) {
        console.log(`Error : ${error}`);
        process.exit(1)
    }

}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log(`Data Destroyed`);
        process.exit()
    } catch (error) {
        console.log(`Error : ${error}`);
        process.exit(1)
    }
}

if (process.argv[2] === "-d") destroyData();
else importData();
