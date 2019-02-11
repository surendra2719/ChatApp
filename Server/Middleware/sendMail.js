
const nodemailer = require('nodemailer');
/*
Here we are configuring our SMTP Server details.
STMP is mail server which is responsible for sending and recieving email.
*/
exports.sendEMailFunction = (url) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'rockzzzsurendra@gmail.com',
            pass: '8106232830'
        },
    });
    const mailOptions = {
        from:'rockzzzsurendra@gmail.com',        // sender address
        to: 'rockzzzsurendra@gmail.com',   // list of receivers
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