const mysql = require('mysql');

var exports = {};
var connection = null;

exports.createConnection = function() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'papereval'
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
       if (err) console.log(err);
        if (results.length == 0) return completeWithStatus(404);
        else return completeWithStatus(200);
    });

    exports.addLogin = function(UserName,otp, completeWithStatus) {
        //connection.query('UPDATE `Login` SET ? WHERE `User Name`=?' , {OTP: otp},[UserName.toUpperCase()],(err,results,fields) => {
            connection.query('UPDATE `Login` SET `OTP` = ? WHERE `User Name`=?' , [otp,UserName.toUpperCase()],(err,results,fields) => {
             //console.log("w1");
             if (err) {
                console.log(err);
                return completeWithStatus(409);
            }
        else return completeWithStatus(200);
    //connection.query('INSERT INTO `Login` (OTP) values('987') WHERE `User Name`=? ',[UserName.toUpperCase()], (err) => {
        //if(err) throw err;
        //if (err) completeWithStatus(409); // 409 conflict
        //return completeWithStatus(200);
    });
};
};
