const emailService = require('../services/email.service');

async function sendEmailController(req, res) {
    const { to, subject, text, html } = req.body;
    try {
        await emailService.sendEmail(to, subject, text, html);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email' });
    }
}

module.exports = {
    sendEmailController
};
