const app = require('./app.js');
const connectDB = require('./data/database.js')
const port = process.env.PORT;

connectDB();

app.listen(port , ()=>{
    console.log(`server is listening to port ${port} in ${process.env.NODE_ENV} mode`)
})