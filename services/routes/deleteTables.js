const express = require('express');
const router = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'user_tables'
});

router.post('/deleteTable', (req, res) => {
    let arr = Object.keys(req.body)[0].replace(/["]/g, '').split(',');
    let results = [];
    for(let i = 0; i < arr.length; i++) {
        const sql = `drop table ${arr[i]}`
        con.query(sql, (err, result) => {
            if(err) {
                results.push(err);
            } else {
                results.push(result);
            }
        })
    }
    res.status(200).json({"results":results});
});

module.exports = router;