const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dbConfig = require('./db');
const PORT = process.env.PORT || 3000;

const app = express();

/* MONGODB CONNECTION */
mongoose.connect(dbConfig.url + dbConfig.databaseName, dbConfig.options, (err)=>{
    if(err){
        throw err;
    }
    console.log('Successfully connected to Database : ' + dbConfig.databaseName);
})

/* MIDDLEWARES */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* INDEX ROUTE */
app.use('/', require('./routes/index'));

/* SERVER START */
app.listen(PORT, ()=>{
    console.log('Server Running on PORT ' + PORT);
})