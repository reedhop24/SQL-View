const express = require('express');
const app = express();
const addTable = require('./routes/createTable');
const queryTable = require('./routes/queryTable');
const deleteTable = require('./routes/deleteTables');
const mysql = require('mysql');

const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'user_tables'
});

con.connect(function(err) {
    if(err) {
        console.log(err);
    } else {
        app.use('/', addTable);
        app.use('/', queryTable);
        app.use('/', deleteTable);
    }
});

app.listen(300, () => {
    console.log('server listening on port 300');
});