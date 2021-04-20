//ejs - template engine allows us to create dynamic html
const express = require('express');
const app = express();
//morgan - logs a message every time we make a request
const morgan = require('morgan');
//bady-parser - allows us to serialize the data and access form data using body property
const bodyparser = require('body-parser');
const path = require('path');

//log request
app.use(morgan('tiny'));

//set view engine. 
app.set("view engine","ejs");

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));
app.use('/fonts',express.static(path.resolve(__dirname,"assets/fonts")));

//load services
app.use(express.json({limit:'1mb'}))

//load routers
app.use('/',require('./server/routes/router'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});