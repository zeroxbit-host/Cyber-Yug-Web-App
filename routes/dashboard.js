// Environment variables
var app_title = process.env.TITLE;
var port = process.env.PORT;
var host = process.env.HOST;

var express = require('express');
var router = express.Router();


// End Point Start From Here
router.get('/', function (req, res) {
    var status = req.session.status;

    if (status == "login") {
        var send_data = {
            title: req.session.userid + ' | Dashboard - ' + app_title,
            port: port,
            host: host,
            status: false
            /* user_id : req.session.userid */
        }

        res.render('dashboard', { data: send_data });
    } else {
        res.redirect('/login');
    }
});

router.get('/course', function(req, res) {
    var status = req.session.status;

    if (status == "login") {
        var send_data = {
            title: req.session.userid + ' | Course - ' + app_title,
            port: port,
            host: host,
            status: false
            /* user_id : req.session.userid */
        }

        res.render("dashboard_course", { data: send_data });
    } else {
        res.redirect('/login');
    }
})

router.get('/category', function(req, res) {
    var status = req.session.status;

    if (status == "login") {
        var send_data = {
            title: req.session.userid + ' | Course - ' + app_title,
            port: port,
            host: host,
            status: false
            /* user_id : req.session.userid */
        }

        res.render("dashboard_category", {data: send_data});
    } else {
        res.redirect('/login');
    }
})

router.get('/student', function(req, res) {
    console.log("Student Page");
    res.send("Student Page")
})

router.get('/certificate', function(req, res) {
    console.log("Certificate Page");
    res.send("Certificate Page")
})

router.get('/quiz', function(req, res) {

    if (req.session.status == "login") {
        var send_data = {
            title: req.session.userid + ' | QUIZ - ' + app_title,
            port: port,
            host: host,
            status: false
            /* user_id : req.session.userid */
        }
        res.render("quiz", {data : send_data})
    } else {
        res.redirect('/login');
    }
})


router.get('/quiz/:quizid', function(req, res) {
    if (req.session.status == "login") {
        var send_data = {
            title: req.session.userid + ' | QUIZ - ' + app_title,
            port: port,
            host: host,
            status: false
        }

        res.render('dashboard_quiz' , { data : send_data });

    } else {
        res.redirect('/');
    }
    
});

module.exports = router;