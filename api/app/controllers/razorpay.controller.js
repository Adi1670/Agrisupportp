// const { ENTITYNAME } = require("../constants/constant");
// const { mongoDb, getMongodbQuery } = require("../db/mongoDb");
const Razorpay = require('razorpay');
const shortid = require('shortid');
// const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY, // Replace with your Razorpay key_id
    key_secret: process.env.RAZORPAY_SECRET // Replace with your Razorpay key_secret
});

const createOrder = async (req, res) => {
    const payment_capture = 1;
    const amount = req.body.price; // Amount in smallest currency unit (e.g., paise)
    const currency = 'INR';

    const options = {
        amount: amount * 100, // Convert to paise if amount is in INR
        currency,
        receipt: shortid.generate(),
        payment_capture
    };

    try {
        const response = await razorpay.orders.create(options);
        res.status(200).json({
            success: true,
            data: {
                id: response.id,
                currency: response.currency,
                amount: response.amount,
                keyID: process.env.RAZORPAY_KEY
            },
            message: "Order created successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const verifyPayment = async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;


//     const hmac = crypto.createHmac('sha256', 'YOUR_KEY_SECRET');

//     hmac.update(${razorpay_order_id}|${razorpay_payment_id});
//     const generated_signature = hmac.digest('hex');

//     if (generated_signature === razorpay_signature) {
//         res.status(200).json({ success: true });
//     } else {
//         res.status(400).json({ success: false });
//     }
}
module.exports = {
    createOrder,
    verifyPayment
}