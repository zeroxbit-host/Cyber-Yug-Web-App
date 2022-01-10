// Environment variables
// var app_title = process.env.TITLE || "Cyber Yug Foundation";
var port = process.env.PORT;
var host = process.env.HOST;

var express = require('express');
var router = express.Router();
var pool = require('../db_con.js');

router.get('/', function (req, res) {

    if (req.session.status == "login") {
        var send_data = {
            title: 'QUIZ - Dashboard - Cyber Yug Foundation',
            port: port,
            host: host,
            status: true,
            soDash: false
        }
    } else {
        // If user is not Login
        var send_data = {
            title: 'QUIZ - Cyber Yug Foundation',
            port: port,
            host: host,
            status: true,
            soDash: true
        }
    }
    res.render('quiz', { data: send_data })


});

router.get('/check/:cat/:title', function (req, res) {
    /*
        Here i Will Retrive Endpoint Like This
        /quiz/check/ccc/Quiz-Quiz
        /quiz/check/category/title

        Now i Have To Gether Parameter
    */

    var response = response = {
        cat: req.params.cat,
        title: req.params.title
    }

    // Now I Have To Get Quiz ID

    var sql = "SELECT `quiz_id` FROM `quiz` WHERE `quiz_cat` = ? AND `quiz_title` = ? ";
    pool.query(sql, [response.cat, response.title], function (err, result) {
        if (err) {
            throw err;
        } else {
            if (req.session.status == "login") {
                /* 
                    Redirect To /dashboard/quiz/12345
                    Redirect To /dashboard/quiz/quizID
                */
                res.redirect("/dashboard/quiz/" + result[0].quiz_id);
            } else {
                /*
                     Redirect To /login/quiz/12345
                     Redirect To /login/type/id
                */
                res.redirect("/login/quiz/" + result[0].quiz_id);
            }
        }
    });
});

module.exports = router;