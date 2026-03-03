const nodemailer = require("nodemailer");

// Sends an email using SMTP credentials.
// options: { email, subject, message }
const sendEmail = async (options) => {
  // SMTP credentials from .env
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;
    
    if (!user || !pass) {
        throw new Error("SMTP credentials are not set in .env");
    }
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user,
        pass,
    },
});

const mailOptions = {
    from,
    to: options.email,
    subject: options.subject,
    text: options.message,
};


try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
} catch (err) {
    console.error("Failed to send email:", err.message);
    throw err;
}
};

module.exports = sendEmail;