const mongoose = require('mongoose');

const connectDB = () =>{mongoose.connect(process.env.MONGO_URL , {dbName:'backend_api'}).
then((c)=>{
    console.log(`Database is connected with ${c.connection.host}`);
}).catch((err)=>{
    console.log(err);
})}

module.exports = connectDB;