
const express = require('express');
const bodyParser = require('body-parser');
const app=express();
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 1337;
const secret='risotto'; //token used
const database = require('./database.js');
const mailer = require('./mailer.js');

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

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
          //queryDatabase()
       }
   }
 );




//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public')); //connects the public folder to frontend

app.post('/index',(req,res)=>{
		if(req.body.user && req.body.password)
		{
			var otp_generation = 0;
			//const token=jwt.sign({'Username':req.body.user},secret);
			var query = "SELECT * FROM login WHERE UserName = '" + req.body.user + "' AND Password = '" + req.body.password + "';";
			var request = new Request(query,function(err, rowCount, rows)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					if(rowCount != 0)
					{
						otp_generation = 1;
					}
				}

				if(otp_generation == 1)
				{
					console.log("Otp Generation Started");

					//const otp=randomstring.generate({length:6, charset:'numeric'});
					const otp = Math.floor(100000 + Math.random() * 900000);
					const token=jwt.sign({'Username':req.body.user},secret);
					mailer.sendMail({ //MESSAGE OBJECT
		                        from: '"Online Paper Evaluation Portal" <risottopenne@gmail.com>',
		                        to: req.body.user,
		                        subject: 'Login Authentication',
		                        text: 'Some text',
		                        //html: 'To find out later-ask gagan'
		                        html: 'Your OTP is' + otp.toString()
		                    }, function(data) {

		                    	//var query2 = "UPDATE login SET OTP"


		                      res.sendStatus(200);
		                    });			
					res.status(200).send(token);
				}

				else
				{
					console.log("OTP not sent : User Name and Password didn't match");
					res.sendStatus("404");
				}
			});

			connection.execSql(request);

			request.on('row', function(columns) 
			{
			    columns.forEach(function(column) 
			    {
			    	console.log("%s\t%s", column.metadata.colName, column.value);
			 	});
			});

			
		}
		
});


app.post('/otp',(req,res)=>{

	if(req.body.user,req.body.otp)
	{

	}
});


//Node Server
app.listen(port, function() {
    console.log('Listening on port ' + port);
    //database.createConnection();
});


