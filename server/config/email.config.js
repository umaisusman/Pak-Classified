const nodemailer = require("nodemailer")
require("dotenv").config()

// Getting env variable from dotenv
const host = process.env.MAIL_HOST
const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS

const transporter = nodemailer.createTransport({
    host,
    auth: {
        user,
        pass,
    },
    tls: {
        rejectUnauthorized:false,
    }
});

module.exports = transporter