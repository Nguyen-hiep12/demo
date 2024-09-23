var mysql = require('mysql');
var db =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'asmtc',
    multipleStatements: true
});
db.connect(function(err) {
    if (err) { console.log('Loi ket noi database', err); db.end();}
        else console.log('da ket noi database ');
});
module.exports = db;