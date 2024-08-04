import transporter from "./MailTransporter.js";

// Send email
const SendMail = (mailOptions) => {
    transporter.sendMail(mailOptions);
}

export default SendMail;