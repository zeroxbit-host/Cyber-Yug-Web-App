require("dotenv").config();

// Environment variables
var app_title = process.env.TITLE;
var public_key = process.env.RAZORPAY_PUBLIC_KEY;
var secret_key = process.env.RAZORPAY_SECRET_KEY;

var express = require('express');
var router = express.Router();

const Razorpay = require("razorpay");
const shortid = require("shortid");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const cors = require("cors");

// Middelware
router.use(cors());
router.use(bodyParser.json());


var instance = new Razorpay({
    key_id: public_key,
    key_secret: secret_key,
});

router.get('/', (req, res) => {
    console.log("Line Number 21");
    res.end('This is Payment Default End Point');
})

// To Verify Ourself

//router.use('/verify', bodyParser.urlencoded({ extended: true, }));
router.post("/verify", (req, res) => {

    /*
    const secret = secret_key;

    console.log("Line 37 : " + JSON.stringify(req.body)); // Comment  1

    const shasum = crypto.createHmac("sha256", secret);

    console.log("Line 41 : " + JSON.stringify(shasum)); // Comment 2

    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    console.log("Line 46 : " + digest); // Comment 3

    console.log("Line 48 : " + digest +  req.headers["x-razorpay-signature"]); // Comment 4

    if (digest === req.headers["x-razorpay-signature"]) {
        console.log("request is legit"); // Comment 5
        res.status(200).json({
            message: "OK",
        });
    } else {
        res.status(403).json({ message: "Invalid" });
    }
    */


    // Second Way To Verify It

    // console.log(req.params.order_id); // Commment 66
    var paymentId = "order_Ihyqk5V81lpfHv";

    console.log("Line 69 : " + paymentId); // Comment 69

    var paymentDocument = instance.payments.fetch(paymentId);

    if (paymentDocument.status == "captured") {
        res.send("Request is Legit");
    } else {
        res.status(403).json({ message: "Invalid" });
    }


});

// To Check Payment System

router.post("/order", async (req, res) => {
    const payment_capture = 1;
    const amount = 5 * 100;
    const currency = "INR";

    const options = {
        amount,
        currency,
        receipt: shortid.generate(),
        payment_capture,
    };

    try {
        const response = await instance.orders.create(options);
        console.log(response);
        res.status(200).json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (err) {
        console.log(err);
    }
});


module.exports = router;

/* 
Github Repository

https://github.com/RajatSablok/nodejs-razorpay/blob/master/razorpay-backend/app.js

https://github.com/pratik149/node-razorpay/blob/main/routes/web/payments.js


Razor Pay Documentation

https://razorpay.com/docs/payment-gateway/server-integration/nodejs/usage/

Razor Pay Web Integration Documentation

https://razorpay.com/docs/payment-gateway/web-integration/standard/

Quick Integration

https://razorpay.com/docs/payment-gateway/quick-integration/


Store This Data into Our Database
This is Step 3
{  "razorpay_payment_id": "pay_29QQoUBi66xm2f",  "razorpay_order_id": "order_9A33XWu170gUtm",  "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"}

generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, secret);

if (generated_signature == razorpay_signature) {
    payment is successful
}
*/