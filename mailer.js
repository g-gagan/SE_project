const nodemailer = require('nodemailer');

var exports = {};

//SENDER Credentials
let transporter = nodemailer.createTransport({
  service : 'gmail',
  auth : {

    user : 'risottopenne@gmail.com',
    pass : 'potatopotato'
  
  }

});

exports.sendMail = (options, callback) => {

  let mailOptions = options;
  transporter.sendMail(mailOptions, (error, info) => {
    if(error) throw error;
    return callback({ id : info.messageId, response : info.response });

  });
};


module.exports = exports;