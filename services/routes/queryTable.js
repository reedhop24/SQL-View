const express = require('express');
const router = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { restart } = require('nodemon');

router.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'user_tables'
});

router.get('/tableData', (req, res) => {
    const query = req.query['query'];
    con.query(query, function (err, result, fields) {
        if(err) {
            res.status(200).json({
                "status": "error",
                "details": err
            })
        } else {
            res.status(200).json({
                "status": "success",
                "details": result
            });
        }
    });
});

module.exports = router;