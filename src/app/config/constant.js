import dotenv from 'dotenv'
dotenv.config()

export const constant = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
    EMAIL: process.env.EMAIL,
    EMAIL_PASS: process.env.EMAIL_PASS,
    OTP_EXPIRATION_MINUTE: process.env.OTP_EXPIRATION_MINUTE
}