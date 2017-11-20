/*var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

// Create connection to database
var config = 
   {
     userName: 'admin123', 
     password: 'SEproject123!',
     server: 'paperevalserver.database.windows.net',
     options: 
        {
           database: 'paperEvalDB' 
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
          console.log("Connected to DB");
          queryDatabase()
       }
   }
 );




function queryDatabase()
{ 
    console.log('Reading rows from the Table...');

   // Read all rows from table
    request = new Request(
        // "SELECT TOP 20 pc.Name as CategoryName, p.name as ProductName FROM [SalesLT].[ProductCategory] pc JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid",
        "SELECT * FROM login WHERE UserName=@name AND Password=@pwd",
             function(err, rowCount, rows) 
            {
                console.log(rowCount + ' row(s) returned');
                process.exit();
            }
        );

  // var sql = 'SELECT * FROM login WHERE UserName=@name AND Password=@pwd';
  var sql = 'SELECT * FROM login WHERE UserName=@name AND Password=@pwd';
  var request = new Request(sql, function(err) {
    if(err) console.log(err);
  });

  request.addParameter('name', TYPES.VarChar, 'jyotsna.prasad3@gmail.com');
  request.addParameter('pwd', TYPES.VarChar, 'jyo123');

  connection.execSql(request);

    request.on('row', function(columns) {
        columns.forEach(function(column) {
        console.log("%s\t%s", column.metadata.colName, column.value);
     });
         });
}*/