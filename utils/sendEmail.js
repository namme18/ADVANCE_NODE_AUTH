const nodemailer = require('nodemailer');
const config = require('config');

const sendEmail = (options) => {

    const transporter = nodemailer.createTransport({
        host: config.get('host'),
        port: config.get('port'),
        auth:{  
            user: config.get('emailUsername'),
            pass: config.get('emailPassword'),
        }

    })

    const mailOption = {
        from: config.get('emailFrom'),
        to: options.to,
        subject: options.subject,
        html: options.text
    }

    transporter.sendMail(mailOption, (err, info) => {
        if(err) return console.log(err);
        return console.log(info);
    })
}

module.exports = sendEmail;