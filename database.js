const mysql = require('mysql');

var exports = {};
var connection = null;

exports.createConnection = function() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'exam'
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
}

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
       connection.query('UPDATE `student_details` SET `1a`= ? , `1b`= ? , `1c`= ?, `2a`= ? , `2b`= ? , `2c` = ? , `3a`= ? , `3b`= ? , `3c` = ?, `R1` = ?, `R2` = ?,`R3` = ?,`R4` = ?,`R5` = ?,`R6` = ?,`R7` = ?,`R8` = ?,`R9` = ?   WHERE `UserName` = ?' , [oa,ob,oc,toa,tob,toc,tha,thb,thc,oar,obr,ocr,toar,tobr,tocr,thar,thbr,thcr,user] ,(err,results,fields) => {
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
    
   exports.view = function(user,course)
   {
        //connection.query('SELECT `1a`,`1b`,`1c`,`2a`,`2b`,`2c`,`3a`,`3b`,`3c`,`R1`,`R2`,`R3`,`R4`,`R5`,`R6`,`R7`,`R8`,`R9` FROM `student_details` WHERE `USN`=123 AND Course = ?', [course], (err,results,fields) =>
        connection.query('SELECT `USN` from `student_name` where `UserName` = ?', [user] ,(err, results1, fields) => {
        
            if (err) console.log(err);
           
            else{
                connection.query('SELECT `1a`,`1b`,`1c`,`2a`,`2b`,`2c`,`3a`,`3b`,`3c`,`R1`,`R2`,`R3`,`R4`,`R5`,`R6`,`R7`,`R8`,`R9` FROM `student_details` WHERE `USN`=results1[0].USN AND Course = ?', [course], (err,results,fields) =>{

                if(err)  console.log(err);
                //console.log(results);
               // else return completeWithStatus(200,results[0].1a,results[0].1b,results[0].1b,results[0].1c,results[0].2a,results[0].2b,results[0].2c,results[0].3a,results[0].3b,results[0].3c,results[0].oar,results[0].obr,results[0].ocr,results[0].toar,results[0].tobr,results[0].tocr,results[0].thar,results[0].thbr,results[0].thcr);
                //else return completeWithStatus(200,results[0].oar); 
             return completeWithStatus(200);

                });
            }


        });
//            else return completeWithStatus(404);
    
   }


   exports.getStud= function(user,course,completeWithStatus)
   {
    connection.query('SELECT `USN` ,`LINK` FROM `student_details` WHERE `UserName` = ? AND `Course` = ?', [user,course], (err,results,fields) => {
        if(err) console.log(err);
        //console.log("print");
        console.log(results);
        return completeWithStatus(200,results);

    });
   }

    exports.getTotal = function(user,course,completeWithStatus){
        connection.query('SELECT `USN`,`total` FROM `student_details` WHERE `UserName` = ? AND `Course` = ?', [user,course], (err,results,fields) => {
        if(err) console.log(err);
        console.log(results);
        alert(results);
        return completeWithStatus(200,results);
    });
   };
//('SELECT `USN` from `student_name` where `UserName` = ?', [user] )