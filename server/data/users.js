const bcrypt = require('bcrypt')
const User = [
    {
        name : 'admin' , email : 'admin@gmail.com' , password : bcrypt.hashSync('123456',10),isAdmin :true 
    },
    {
        name : 'tejas' , email : 'tparkar0@gmail.com' , password : bcrypt.hashSync('tejas@123',10)
    },
    {
        name : 'shlok' , email : 'shlok@gmail.com' , password : bcrypt.hashSync('shlok@123',10)
    }
];

module.exports = User;