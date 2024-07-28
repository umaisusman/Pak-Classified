// Requiring transporter from email config file
const transporter = require('../config/email.config');

// Created a function for send email to any person
async function sendEmail(to, subject, text, html) {
    try {
        const info = await transporter.sendMail({
            from: 'waleedahmad4015394@gmail.com',
            to: to,
            subject: subject,
            text: text,
            html: html
        });
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = {
    sendEmail
};
