const nodemailer = require('nodemailer');
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }
    });

//send contact email from website.
module.exports.sendContactEmail = async(req, res) => {
    const {name, phone, sender, message} = req.body;
    const mailData = {
          from: {
            name: `${name}`,
            address: `${sender}`
          }, // sender address
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

//send email to user for order confirmation.
module.exports.sendOrderEmail = async(req, res) => {
  const {orderId, userName, userEmail} = req.body;
  const mailData = {
        from: {
          name: 'Vespagiri.com',
          address: 'info@vespagiri.com'
        }, // sender address
        to: `${userEmail}`,   // list of receivers
        subject: 'New order confirmation mail.', // Subject line
        html: `Hello ${userName}, You have placed a new order in vespagiri.com. Your order
        id is: <b>${orderId}</b>. You can check your order detail and status by loging in your account 
        in our website.<br/><br/>
        Thank you.<br/> Vespagiri.com`
      };
      transporter.sendMail(mailData, function (err, info) {
          if(err)
            console.log(err);
          else
            res.send({message:'Order email sent successfully.'});
       });    
}