
const nodemailer = require('nodemailer');
/*
Here we are configuring our SMTP Server details.
STMP is mail server which is responsible for sending and recieving email.
*/
exports.sendEMailFunction = (url) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:process.env.email,
            pass: process.env.password
        },
    });
    const mailOptions = {
        from:process.env.email,        // sender address
        to: process.env.email,   // list of receivers
        subject: 'node.js send mail',       // Subject line
        text: 'Your Email verifaction link is:\n\n'+url 
    };
    transporter.sendMail(mailOptions,  (err,info) => {
        if (err)
            console.log("error on sent mail"+err)
        else
            console.log("result sent on mail"+info);
    });
}