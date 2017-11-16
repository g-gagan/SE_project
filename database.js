const mysql = require('mysql');

var exports = {};
var connection = null;

exports.createConnection = function() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'Exam'
    });
    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected to DB');
    });
};

module.exports = exports;

//checks the user and password from the database 
exports.checkLoginEntry = function(UserName, password, completeWithStatus) {
    connection.query('SELECT * FROM `Login` WHERE `UserName`=? AND `Password`=?', [UserName.toUpperCase(), password], (err, results, fields) => {
       if (err) console.log(err);
        if (results.length == 0) return completeWithStatus(404);
        else return completeWithStatus(200);
    });

    exports.addLogin = function(UserName,otp, completeWithStatus) {
        //connection.query('UPDATE `Login` SET ? WHERE `User Name`=?' , {OTP: otp},[UserName.toUpperCase()],(err,results,fields) => {
            connection.query('UPDATE `Login` SET `OTP` = ? WHERE `UserName`=?' , [otp,UserName.toUpperCase()],(err,results,fields) => {
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

    exports.checkOTPEntry = function(user, otp,completeWithStatus) {
        console.log("User: " + user);
        connection.query('SELECT * FROM `Login` WHERE `UserName` = ?',[user] ,(err, results, fields) => {
       if (err) console.log(err);
       //console.log(results);
       // console.log(fields);
       //console.log("OTP:" + otp);
       //console.log("Type:" + results[0].Type)
       if (otp == results[0].OTP)
       { console.log("checked");
        return completeWithStatus(200,results[0].Type);
    }
    else return completeWithStatus(404);

    });
    }

    exports.updateMarks= function(user,oa,ob,oc,toa,tob,toc,tha,thb,thc,oar,obr,ocr,toar,tobr,tocr,thar,thbr,thcr,completeWithStatus)
    {
       connection.query('UPDATE `student_details` SET `1a`= ? , `1b`= ? ,`2a`= ? , `2b`= ? , `3a`= ? , `3b`= ?  WHERE `UserName` = ?' , [oa,ob,toa,tob,toc,tha,user] ,(err,results,fields) => {
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
   }
    



};
