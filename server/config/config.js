const mongoose = require('mongoose');
const connectDb = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL , {
            useUnifiedTopology : true,
            useNewUrlParser : true,
            useCreateIndex : true
        });
        console.log(`Connection Sucessful to MongoDB ${connection.connection.host}`)
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDb;