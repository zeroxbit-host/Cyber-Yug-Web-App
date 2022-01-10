// Environment variables
var app_title = process.env.TITLE || "Cyber Yug Foundation";
var port = process.env.PORT || 3000;
var host = process.env.HOST || '127.0.0.1';

var express = require('express');
var router = express.Router();
var emailSyntaxCheck = require("email-syntax-check")
var pool = require('../db_con.js');

const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "jules.weber75@ethereal.email", // generated ethereal user
        pass: "VGKVuPw9nrb4RspBkV", // generated ethereal password
    },
});

router.get('/', function (req, res) {

    if (req.session.status == "login") {
        res.redirect('/dashboard');
    } else {
        var send_data = {
            title: 'Registration - ' + app_title,
            port: port,
            host: host,
            status: true,
            soDash : true
        }
        res.render('register', { data: send_data });
    }
});

router.use('/', bodyParser.urlencoded({ extended: true, }));
router.post('/', function (req, res) {

    // 
    var signup_data = [
        req.body.usr_name + "" + Math.random().toString(10).substr(2, 4),
        req.body.name,
        req.body.usr_name,
        req.body.E_mail_ID,
        req.body.password,
        Number(req.body.mobile_number),
        "student",
        "false"
    ];

    var valid = emailSyntaxCheck.isDisposable(req.body.E_mail_ID);

    if (!valid) {

        var sql = "INSERT INTO `staff`(`provide_id`, `name`, `usrName`, `eMail`, `password`, `mo_no`, `position`, `verify`) VALUES (?) ";
        pool.query(sql, [signup_data], function (err, result) {
            if (err) {
                console.log(err);
            } else {

                var mailOptions = {
                    from: 'jules.weber75@ethereal.email',
                    to: 'sdworlldwithdutchman@gmail.com',
                    subject: 'Sending Email using Node.js',
                    text: 'That was easy!'
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                });

                res.redirect('/verify');
            }
        })

    } else {
        var send_data = {
            error: "Please enter a valid email address"
        }

        console.log(send_data.error);

        //res.redirect('/', {data : send_data});
    }
});

module.exports = router;