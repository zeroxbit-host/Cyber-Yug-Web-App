require('dotenv').config()
// Environment variables
var app_title = "Cyber Yug Foundation";
var port = process.env.PORT;
var host = process.env.HOST;

// Import Require Module
var pool = require('./db_con.js');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();

// View Engine
const { engine } = require('express-handlebars');

// View Engine Configuration
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Expose This directory
app.use(express.static(path.join(__dirname, './assets/')));

// a variable to save a session
var session;

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

// Session middleware
app.use(sessions({
    resave: true,
    saveUninitialized: true,
    secret: "Keep it Secret",
    cookie: { maxAge: oneDay }
}));

// Routes Import
var register = require('./routes/register.js')
var dashboard = require('./routes/dashboard.js')
var crousel = require('./routes/crousel.js')
var quiz = require('./routes/quiz.js')
var payment = require('./routes/payment.js')

// Routes Use
app.use('/register', register);
app.use('/dashboard', dashboard);
app.use('/crousel', crousel);
app.use('/quiz', quiz);
app.use('/payment', payment);

// Method Wher I will Listen
app.get('/', function (req, res) {

    if (req.session.status == "login") {
        var send_data = {
            title: app_title,
            port: port,
            host: host,
            status: true,
            soDash: false
        }
    } else {
        var send_data = {
            title: app_title,
            port: port,
            host: host,
            status: true,
            soDash: true
        }
    }
    res.render('index', { data: send_data });
});

app.get('/course', function (req, res) {
    if (req.session.status == "login") {
        var send_data = {
            title: 'Course - Cyber Yug Foundation',
            port: port,
            host: host,
            status: true,
            soDash: false
        }
    } else {
        var send_data = {
            title: 'Course - Cyber Yug Foundation',
            port: port,
            host: host,
            status: true,
            soDash: true
        }
    }

    res.render('course', { data: send_data });
});

app.get('/ctf', (req, res) => {

    if (req.session.status == "login") {

        var send_data = {
            title: 'CTF - Cyber Yug Foundation',
            port: port,
            host: host,
            status: true,
            soDash: false
        }
    } else {
        var send_data = {
            title: 'CTF - Cyber Yug Foundation',
            port: port,
            host: host,
            status: true,
            soDash: true
        }
    }
    res.render('ctf', { data: send_data })
});


app.get('/franchise', function (req, res) {
    if (req.session.status == "login") {
        var send_data = {
            title: 'Franchise - Cyber Yug Foundation',
            port: port,
            host: host,
            status: true,
            soDash: false
        }
    } else {
        var send_data = {
            title: 'Franchise - Cyber Yug Foundation',
            port: port,
            host: host,
            status: true,
            soDash: true
        }
    }

    res.render('franchise', { data: send_data });
});

app.get('/certificate', function (req, res) {
    if (req.session.status == "login") {
        var send_data = {
            title: 'Certificate - Cyber Yug Foundation',
            port: port,
            host: host,
            status: true,
            soDash: false
        }
    } else {
        var send_data = {
            title: 'Certificate - Cyber Yug Foundation',
            port: port,
            host: host,
            status: true,
            soDash: true
        }
    }

    res.render('certificate', { data: send_data });
});


app.get('/login', function (req, res) {
    if (req.session.status == "login") {
        res.redirect('/dashboard')
    } else {
        var send_data = {
            title: 'Login - ' + app_title,
            port: port,
            host: host,
            status: true,
            redirect: false,
            soDash: true
        }

        res.render('login', { data: send_data });
    }
});

app.get('/login/:type/:id', function (req, res) {
    /*
        Render Login Page
        Send Data Type and ID
    */
    if (req.params.type != '' && req.params.id != '') {

        var send_data = {
            title: 'Login - ' + app_title,
            port: port,
            host: host,
            status: true,
            redirect: true,
            soDash: true,
            type: req.params.type,
            id: req.params.id
        }

        res.render('login', { data: send_data });

    } else {
        res.redirect('/login');
    }
});



// cookie parser middleware
app.use(cookieParser());

app.use('/login', bodyParser.urlencoded({ extended: true, }));
app.post('/login', function (req, res) {

    var signup_data = {
        userName: req.body.usr_id,
        userEmail: req.body.usr_id,
        userPassword: req.body.password,
        type: req.body.type,
        id: req.body.id
    };

    var sql = "SELECT * FROM `staff` WHERE (`usrName` = ? OR `eMail` = ? ) AND `password` = ? ";
    pool.query(sql, [signup_data.userName, signup_data.userEmail, signup_data.userPassword], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result.length != 0) {
                if (result[0].verify == "true") {
                    session = req.session;
                    session.status = "login";
                    session.userid = result[0].provide_id;

                    //console.log(signup_data.type + " " + signup_data.id);

                    if (signup_data.type !== undefined && signup_data.id !== undefined) {
                        res.redirect("/dashboard/" + signup_data.type + "/" + signup_data.id);
                    } else {
                        res.redirect('/');
                    }
                } else if (result[0].verify == "false") {
                    /* console.log("Please Verify Your Mail") */
                    res.redirect('/verify');
                } else {
                    var send_data = {
                        title: 'Unknown Error - Cyber Yug Foundation',
                        port: port,
                        host: host
                    }
                    res.render('error_page', { data: send_data });
                }
            } else {
                var send_data = {
                    title: 'Unknown Error - Cyber Yug Foundation',
                    port: port,
                    host: host
                }
                res.render('error_page', { data: send_data });
            }
        }
    });
});


app.get('/forget', function (req, res) {
    var send_data = {
        title: 'Forget - Cyber Yug Foundation',
        port: port,
        host: host
    }

    res.render('forget', { data: send_data });
});

app.get('/verify', function (req, res) {
    var send_data = {
        title: 'Forget - Cyber Yug Foundation',
        port: port,
        host: host
    };
    res.render('verify', { data: send_data });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('*', function (req, res) {
    if (req.session.status == "login") {
        var send_data = {
            title: '404 Error Page - Cyber Yug Foundation',
            port: port,
            host: host,
            status: true,
            soDash: false
        }
    } else {
        var send_data = {
            title: '404 Error Page - Cyber Yug Foundation',
            port: port,
            host: host,
            status: true,
            soDash: true
        }
    }
    res.render('error_page', { data: send_data });
});

// Start Server Listening on Port
app.listen(port, host, function () {
    console.log('Server is listining on port ' + port + " and Host " + host);
    console.log(` URL http://${host}:${port}/`)
});