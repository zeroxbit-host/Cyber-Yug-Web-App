// Environment variables
var app_title = process.env.TITLE || "Cyber Yug Foundation";
var port = process.env.PORT;
var host = process.env.HOST;

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    var send_data = {
        title: req.session.userid + ' | Dashboard - ' + app_title,
        port: port,
        host: host,
        status: true
        /* user_id : req.session.userid */
    }
    res.render('course', {data : send_data});
})

module.exports = router;