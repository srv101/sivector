const nodemailer = require("nodemailer");
const SMTP_PASS = process.env.SMTP_PASS
const SMTP_USER = process.env.SMTP_USER
const SMTP_RELAY = process.env.SMTP_RELAY
const SMTP_EMAIL_FROM = process.env.SMTP_EMAIL_FROM

async function sendEmail(to, subject, name, email, contact, text, file) {
  let transporter = nodemailer.createTransport({
    host: SMTP_RELAY,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: SMTP_USER, // generated ethereal user
      pass: SMTP_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: SMTP_EMAIL_FROM, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: handalMarkup(name, email, contact, text),
    attachments: checkAttachment(file)
  });

  console.log("Message sent: %s", info.messageId);
}

// sendEmail().catch(console.error)

module.exports = sendEmail;

function checkAttachment(file){
    if(file){
        return [{filename: file.originalname, content: file.buffer}]
    }else {
        return null
    }
}

function handalMarkup(name, email, contact, text){
  if(text){
    return (
    `<p style="font-size: 1.3rem;">Name: ${name}</p>
    <p style="font-size: 1.3rem;">Email: ${email}</p>
    <p style="font-size: 1.3rem;">Contact No: ${contact}</p>
    <p style="font-size: 1.3rem;">Inquery: ${text}</p>`
    )
  }else{
    return (
      `<p style="font-size: 1.3rem;">Name: ${name}</p>
      <p style="font-size: 1.3rem;">Email: ${email}</p>
      <p style="font-size: 1.3rem;">Contact No: ${contact}</p>`
    )
  }
}