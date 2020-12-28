const express = require('express');
const router = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');
const XLSX = require('xlsx');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(upload());

const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database: 'user_tables'
});

router.post('/table', (req, res) => {
    const sheet = req.files ? XLSX.read(req.files.file.data, {type:'buffer'}) : null;
    if(sheet === null) {
        res.json({'error': 'No file specified'});
        return;
    }

    const data = sheet.Sheets.Sheet1;
    let tableName = req.files.file.name.split('.')[0];
    let iterTotal = 0;
    let colsToAdd = [];
    let cols = [];
    let rows = [];
    let currRow = [];

    for(const x in data) {
        if(x.split('')[1] === '1') {
            const nextData = data[x.split('')[0] + '2'].t === 's' ? 'varchar(255)' : 'int(255)'
            colsToAdd.push(`${data[x].v} ${nextData}`);
            cols.push(data[x].v);
        } else {
            break;
        }
    }

    for(const y in data) {
        iterTotal++;
        if(iterTotal > cols.length) {
            currRow.push(data[y].t === 's' ? `'${data[y].v}'` : data[y].v);
        }
        if(currRow.length === cols.length) {
            rows.push(currRow.join(', '));
            currRow = [];
        }
    }

        const createTable = () => {
            const sql = `create table ${tableName} (${colsToAdd.join(', ')})`
            con.query(sql, (err, result) => {
                if(err) {
                    if(err.code === 'ER_TABLE_EXISTS_ERROR') {
                        tableArr = tableName.split('_');
                        if(tableArr.length === 1 || isNaN(tableArr[tableArr.length-1])) {
                            tableName = tableArr.join('_') + '_2';
                        } else {
                            tableArr[tableArr.length-1] = parseInt(tableArr[tableArr.length-1])+1
                            tableName = tableArr.join('_');
                        }
                        createTable();
                    }
                } else {
                    for(let i = 0; i < rows.length; i++) {
                        const sqlInsert = `insert into ${tableName} (${cols.join(', ')}) values (${rows[i]})`
                        con.query(sqlInsert, (err, result) => {
                            if(err) return err;
                        });
                    }
                    res.status(200).json({
                        'status': 'success',
                        'tableName': tableName
                    })
                }
            });
            return 'success';
        }
        const tableRes = createTable();
        if(tableRes !== 'success') {
            res.status(500).json({
                'error': tableRes
            })
        }
});

module.exports = router;
