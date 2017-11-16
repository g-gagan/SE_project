
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

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public')); //connects the public folder to frontend



/*
app.get('/login', (req,res) => {


}*/


 //email - authentication 


app.post('/index',(req,res)=>{
	database.checkLoginEntry(req.body.user,req.body.password,(status)=>{
		if(status==200){
			const token=jwt.sign({'Username':req.body.user},secret);
			const otp=randomstring.generate({length:6, charset:'numeric'});
			mailer.sendMail({ //MESSAGE OBJECT
                        from: '"Online Paper Evaluation Portal" <risottopenne@gmail.com>',
                        to: req.body.user,
                        subject: 'Login Authentication',
                        text: 'Some text',
                        //html: 'To find out later-ask gagan'
                        html: 'Your OTP is' + otp.toString()
                    }, function(data) {
                      res.sendStatus(200);
                    });			
			res.status(200).send(token);
		}
		
		else if(status==404){
			res.sendStatus(404);
		}	
	}); 
	console.log(req.body);
	//res.sendStatus(200);
});



//Node Server
app.listen(port, function() {
    console.log('Listening on port ' + port);
    //database.createConnection();
});


