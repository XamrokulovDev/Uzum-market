// importing
const express = require("express");
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');
// importing swagger configuration  
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
// errorHandle 
const errorHandle = require('./middlewares/error');
// App file
const app = express();
// cors
app.use(cors()) ;
// .env
dotenv.config();
if(process.env.NODE_ENV ==="developer"){
    app.use(morgan("dev"));
};
// Body parser 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// MongoDb server
connectDB();
// Router
app.use("/", require('./router/auth.route'));
app.use('/', require('./router/cart.route'));
// Swagger route
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Error
app.use(errorHandle);
// Listening
const PORT = process.env.PORT;
app.listen(PORT,(err)=>{
    if(err) {
        console.log(`Serverda xatolik ${err}`.bgRed);
    }
    console.log(`Dastur ${PORT} da ishlamoqda...`);
});