const express = require('express');
const router = require('./routes/user.js');
const taskrouter = require('./routes/task.js');
const {errorMiddleware} = require('./middlewares/error.js');
const {config} = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

config({
    path: "./data/config.env",
})

//middleware to access the json data
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET" , "POST" , "PUT" , "DELETE"],
    credentials: true,
}));
app.use( "/user", router);
app.use('/tasks' , taskrouter);

//using errormiddleware
app.use(errorMiddleware);
module.exports = app;
