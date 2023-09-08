// Sends an email to the hostEmail, and a confirmation to sender. For jm-portfolio

const hostEmail = require('../../static/hostEmail.js');
const generateEmail = require('../generate-email/generateEmail.js');
const nodemailer = require('nodemailer');

async function sendEmail (name, senderEmail, message) {

    // Functions

    function sendConfirmation (name, senderEmail, message) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: hostEmail.email,
                pass: hostEmail.password
            }
        });

        const mailOptions = {
            from: hostEmail.email,
            to: senderEmail,
            subject: 'Message confirmation',
            html: generateEmail(name, message, senderEmail, 'confirmation')
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
    }

    function sendToHost (name, senderEmail, message) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: hostEmail.email,
                pass: hostEmail.password
            }
        });

        const mailOptions = {
            from: hostEmail.email,
            to: 'jamclean23@gmail.com',
            subject: 'Message via portfolio, do not reply',
            html: generateEmail(name, message, senderEmail, 'toHost')
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
    }

    // Promise

    return new Promise((resolve, reject) => {

        sendConfirmation(name, senderEmail, message);
        sendToHost(name, senderEmail, message);

        console.log('NAME: ' + name, '\nCONFIRMATION SENT: ' + senderEmail, '\nMESSAGE: ' + message, '\nSENT TO: ' + hostEmail.email);
        resolve('success');
    });
}

module.exports = sendEmail;