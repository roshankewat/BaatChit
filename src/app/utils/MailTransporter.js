import nodemailer from 'nodemailer'
import { constant } from "../config/constant.js";


// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // For Gmail
    auth: {
        user: constant.EMAIL,
        pass: constant.EMAIL_PASS
    }
});

export default transporter;