
//ejs - template engine allows us to create dynamic html
const express = require('express');
const app = express();

//dotenv - so we can share the code w out telling everyone which port we're running on.
const dotenv = require('dotenv');

//morgan - logs a message every time we make a request
const morgan = require('morgan');

//bady-parser - allows us to serialize the data and access form data using body property
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080;

//log request
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine. can be ejs, html, pug, ...
app.set("view engine","ejs");
//use this line if you move the files away from __dirname/views/
// app.set("views",path.resolve(__dirname, "path/to/files"));

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/image")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

//load routers
app.use('/',require('./server/routes/router'));

app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});

 