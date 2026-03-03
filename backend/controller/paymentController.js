// paymentController.js
const axios = require("axios");
const Transaction = require("../model/paymentModel");
const { generateHmacSha256Hash } = require("../services/helper");

// Initiate Payment
const initiatePayment = async (req, res) => {
    try {
    const {
        amount,
        productId,
        paymentGateway,
        customerName,
        customerEmail,
        customerPhone,
        productName,
    } = req.body;
    
    if (!paymentGateway) {
        return res.status(400).json({ message: "Payment gateway is required" });
    }

    // Customer details object
    const customerDetails = {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
    };

    // Prepare transaction data for DB
    const transactionData = {
        customerDetails,
        product_name: productName,
        product_id: productId,
        amount,
        payment_gateway: paymentGateway.toLowerCase(),
        status: "PENDING",
    };

    let paymentConfig;

    // Esewa Gateway 
    if (paymentGateway.toLowerCase() === "esewa") {
        const paymentData = {
            amount,
            total_amount: amount,
            transaction_uuid: productId,
            product_code: process.env.ESEWA_MERCHANT_ID,
            success_url: process.env.SUCCESS_URL,
            failure_url: process.env.FAILURE_URL,
            tax_amount: "0",
            product_delivery_charge: "0",
            product_service_charge: "0",
            signed_field_names: "total_amount,transaction_uuid,product_code",
        };
        
        const dataString = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
        const signature = generateHmacSha256Hash(dataString, process.env.ESEWA_SECRET);

    paymentConfig = {
        url: process.env.ESEWA_PAYMENT_URL,
        data: { ...paymentData, signature },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseHandler: (response) => response.request?.res?.responseUrl,
    }


    // Khalti Gateway 
    } else if (paymentGateway.toLowerCase() === "khalti") {
        const paymentData = {
            amount: amount * 100, // Khalti expects paisa
            mobile: customerPhone,
            product_identity: productId,
            product_name: productName,
            return_url: process.env.SUCCESS_URL,
            failure_url: process.env.FAILURE_URL,
            public_key: process.env.KHALTI_PUBLIC_KEY,
            website_url: "http://localhost:5173",
            purchase_order_id: productId,
            purchase_order_name: productName,
        };
        
        paymentConfig = {
            url: process.env.KHALTI_PAYMENT_URL,
            data: paymentData,
            
            headers: {
                Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        responseHandler: (response) => response.data?.payment_url,
    };
    
    } else {
        return res.status(400).json({ message: "Invalid payment gateway" });
    }
    
    // Make payment request
    const paymentResponse = await axios.post(paymentConfig.url, paymentConfig.data, {
        headers: paymentConfig.headers,
    });
    
    const paymentUrl = paymentConfig.responseHandler(paymentResponse);
    if (!paymentUrl) throw new Error("Payment URL is missing");
    
    //  Save transaction in DB
    await Transaction.create(transactionData);
    
    res.status(200).json({
        url: paymentUrl,
        product_id: productId,
        pidx: paymentResponse.data?.pidx || productId,
        status: "PENDING",
    });
    
    } catch (error) {
        console.error("Payment initiation error:", error.response?.data || error.message);
        res.status(500).json({
            message: "Payment initiation failed",
            error: error.response?.data || error.message,
        });
    }
};

// Check Payment Status
const paymentStatus = async (req, res) => {
    try {
        const { product_id, pidx, status } = req.body;
        
        const transaction = await Transaction.findOne({ where: { product_id } });
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    // Directly mark FAILED if status is sent as FAILED
    if (status === "FAILED") {
        await transaction.update({ status: "FAILED" });
        return res.status(200).json({ message: "Transaction failed", status: "FAILED" });
    }

    let newStatus = "FAILED";

    if (transaction.payment_gateway === "esewa") {
        const response = await axios.get(process.env.ESEWA_PAYMENT_STATUS_CHECK_URL, {
            params: {
                product_code: process.env.ESEWA_MERCHANT_ID,
                total_amount: transaction.amount,
                transaction_uuid: transaction.product_id,
            },
        });
        
        newStatus = response.data.status === "COMPLETE" ? "COMPLETED" : "FAILED";
    }
    
    if (transaction.payment_gateway === "khalti") {
        const response = await axios.post(
            process.env.KHALTI_VERIFICATION_URL,
            { pidx },
        {
            headers: {
                Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });

        newStatus = response.data.status === "Completed" ? "COMPLETED" : "FAILED";
    }

    // ✅ Update transaction status in DB
    await transaction.update({ status: newStatus });
    
    res.status(200).json({
        message: `Transaction ${newStatus}`,
        status: newStatus,
    });
    
    } catch (error) {
        console.error("Payment status check error:", error.response?.data || error.message);
        res.status(500).json({
            message: "Payment status check failed",
            error: error.response?.data || error.message,
        })
    }
};

module.exports = { initiatePayment, paymentStatus };