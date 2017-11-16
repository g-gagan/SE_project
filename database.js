const mysql = require('mysql');

var exports = {};
var connection = null;

exports.createConnection = function() {
    connection = mysql.createConnection({
        host: 'paperevalserver.database.windows.net',
        user: 'admin123',
        password: 'admin123',
        database: 'paperEvalDB'
    });
    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected to DB');
    });
};

module.exports = exports;

//checks the user and password from the database 
exports.checkLoginEntry = function(UserName, password, completeWithStatus) {
    connection.query('SELECT * FROM `Login` WHERE `User Name`=? AND `Password`=?', [UserName.toUpperCase(), password], (err, results, fields) => {
        if (err) throw err;
        if (results.length == 0) return completeWithStatus(404);
        else return completeWithStatus(200);
    });
};
