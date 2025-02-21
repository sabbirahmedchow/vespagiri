const nodemailer = require('nodemailer');
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }
    });

module.exports.sendContactEmail = async(req, res) => {
    const {name, phone, sender, message} = req.body;
    const mailData = {
          from: `${name} < ${sender} >`,  // sender address
          to: 'sabbirahmedchowdhury@gmail.com',   // list of receivers
          subject: 'Contact message from Vespagiri', // Subject line
          html: `A contact message has been sent from Vespagiri website. <br>
          Name: ${name} <br> Phone: ${phone} <br> Email: ${sender} <br> Message: ${message} <br>
          Reach out to the sender as soon as possible. <br>
          Regards,`
        };
        transporter.sendMail(mailData, function (err, info) {
            if(err)
              console.log(err);
            else
              res.send({message:'Your message sent successfully. Thank you.'});
         });    
};