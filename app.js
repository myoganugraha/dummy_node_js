
'use strict';

const express = require('express');
const app = express();
// const path = require('path');

var mysql = require('mysql');

const bodyParse = require('body-parser');
const logger = require('morgan');
const router = express.Router();
const port =  process.env.PORT || 8080;

app.use(bodyParse.json());
app.use(logger('dev'));

//Koneksi ke database
app.use((req, res, next) => {
    global.connection = mysql.createConnection({
        host:       "localhost",
        user:       "root",
        password:   "",
        database:   "envybank"
    });
    connection.connect();
    next();
})

require('./routes')(router);
app.use('/api/envybank', router);
// app.use('/api/envybank/assets', express.static(path.join(__dirname, '/assets')));

app.listen(port);

console.log('App Run on ' + port);