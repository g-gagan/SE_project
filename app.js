var http=require('http');
const randomstring = require('randomstring');
const express = require('express');
const bodyParser = require('body-parser');
const app=express();
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const port = 3000;
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
			//const otp=Math.floor((Math.random()*2345)+1).toString();
			const otp= randomstring.generate({length:6 , charset:'numeric'});
			mailer.sendMail({ //MESSAGE OBJECT
                        from: '"Online Paper Evaluation Portal" <risottopenne@gmail.com>',
                        to: req.body.user,
                        subject: 'Login Authentication',
                        text: 'Some text',
                        //html: 'To find out later-ask gagan'
                        html: 'Your OTP is ' + otp

                    },

                     function(data) {
                    	console.log("OTP has been sent to the email");
                    	database.addLogin(req.body.user,otp, (status) => {
                    		//if(status==200)
                    			//res.sendStatus(status);

                    	//console.log(status);
                    	//const user= req.body.user;
                      	res.sendStatus(status);
                      	//console.log("w2");
                    });

                    });			
			//res.status(200).send(token);
		}
		
		else if(status==404){
			res.sendStatus(404);
		}	
	}); 
	//console.log(req.body);
	//res.sendStatus(200);
});

app.post('/otp',(req,res)=>{
	//console.log("otp checking");
	//console.log(req.body.otp);
	database.checkOTPEntry(req.body.user,req.body.otp,(status,type)=>{
		//console.log(status,type);
		res.setHeader('Content-Type','application/json');
		res.status(status).send({"Type":type});
	});
});


app.post('/update',(req,res)=>{
	//console.log("otp checking");
	//console.log(req.body.otp);
	database.updateMarks(req.body.user, req.body.link,req.body.onea, req.body.oneb, req.body.onec, req.body.twoa ,req.body.twob ,req.body.twoc, req.body.threea, req.body.threeb, req.body.threec,
							req.body.onearev, req.body.onebrev, req.body.onecrev, req.body.twoarev ,req.body.twobrev ,req.body.twocrev, req.body.threearev, req.body.threebrev, req.body.threecrev,	(status)=>{
		res.sendStatus(status);
	});
  });

app.post('/view',(req,res)=>{
	console.log("Entering app.js");
		database.view(req.body.stu_user,req.body.course,(status,results) => {
			res.status(status).send(results);

		});

	});



app.post('/getStudent',(req,res)=>{
		database.getStud(req.body.user,req.body.course,(status,results) => {
			res.status(status).send(results);

		});

	});


//Node Server
app.listen(port, function() {
    console.log('Listening on port ' + port);
    database.createConnection();
});


