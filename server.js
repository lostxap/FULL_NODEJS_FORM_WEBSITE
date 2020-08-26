const express = require('express');

const path = require('path');

var bodyParser = require('body-parser')
var nodemailer = require('nodemailer');
const { query } = require('express');
const app = express();

var validator = require("email-validator")

app.use(bodyParser.urlencoded({ extended: false }));

let username;


app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname + '/index.html'));
})


app.post('/',(req,res) =>{
    username = req.body.name_field[0];
    email = req.body.name_field[1];
    message = req.body.name_field[2];

    var right = validator.validate(email); // true

    if (right == true){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'insert email',
          pass: 'insert password'
        }
      });
      
      var mailOptions = {
        from: 'insert email',
        to: 'lostxap@gmail.com',
        subject: username,
        text: message + '       '  + email
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });    
    }
})




app.listen(5000 , err => {
    if (err){
        console.log(err);
    }else{
        console.log('All is fine');
    }
})

