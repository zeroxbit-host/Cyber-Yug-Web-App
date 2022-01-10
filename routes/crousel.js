/* Home Crousel JS */
require('dotenv').config()
// Environment variables
var port = process.env.PORT;
var host = process.env.HOST;

var express = require('express');
var router = express.Router();
var pool = require('../db_con.js');

/* Basic Variable To Store Data */
var lang, course;
/* API To Fetch With Different Category  with Diffrent Course */

router.get('/:lang/:course', function (req, res) {

    var send_data = {"course" : [
        { title : req.params.course + " 1", lang :  req.params.lang +  "." },
        { title : req.params.course + " 2", lang :  req.params.lang + "." },
        { title : req.params.course + " 3", lang :  req.params.lang + "." },
        { title : req.params.course + " 4", lang :  req.params.lang + "." },
        { title : req.params.course + " 5", lang :  req.params.lang + "." },
        { title : req.params.course + " 6", lang :  req.params.lang + "." },
        { title : req.params.course + " 7", lang :  req.params.lang + "." },
        { title : req.params.course + " 8", lang :  req.params.lang + "." },
        { title : req.params.course + " 9", lang :  req.params.lang + "." },
        { title : req.params.course + " 10", lang :  req.params.lang + "." },
        { title : req.params.course + " 11", lang :  req.params.lang + "." },
        { title : req.params.course + " 12", lang :  req.params.lang + "." },

    ]}

    /*
    var send_data =  {
        lang : req.params.lang,
        course : req.params.course,
        status : "logout"
    }
        TODO:  Start DataBase Data Fetching 

    var sql = "";
    pool.query(sql, [lang, course], function (err, result) {
    }


        TODO:  To Send Fetch Data To Reverse Back
    */
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(send_data));

    /* res.render("crousel", { data : send_data }); */

});

module.exports = router;