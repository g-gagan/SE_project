var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config = 
   {
     userName: 'admin123', // update me
     password: 'SEproject123!', // update me
     server: 'paperevalserver.database.windows.net', // update me
     options: 
        {
           database: 'paperEvalDB' //update me
           , encrypt: true
        }
   }
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) 
   {
     if (err) 
       {
          console.log(err)
       }
    else
       {
           queryDatabase()
       }
   }
 );

function queryDatabase()
{ 
    console.log('Reading rows from the Table...');

   // Read all rows from table
    request = new Request(
        "SELECT TOP 20 pc.Name as CategoryName, p.name as ProductName FROM [SalesLT].[ProductCategory] pc JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid",
             function(err, rowCount, rows) 
            {
                console.log(rowCount + ' row(s) returned');
                process.exit();
            }
        );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
        console.log("%s\t%s", column.metadata.colName, column.value);
     });
         });
 connection.execSql(request);
}




/*
const mysql = require('mysql');

var exports = {};
var connection = null;

exports.createConnection = function() {
    connection = mysql.createConnection({
        host: 'paperevalserver.database.windows.net',
        user: 'admin123',
        password: 'admin123',
        database: 'paperEvalDB',
        port: 1337,
    	ssl: true
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
*/