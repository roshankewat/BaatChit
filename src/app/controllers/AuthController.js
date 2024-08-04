import { validationResult } from 'express-validator'
import bcryptjs from 'bcryptjs'

// Models
import Users from '../models/UserModel.js'
import OneTimePassword from '../models/OneTimePasswordModel.js'

// Utils
import OneTimePasswordGenerator from '../utils/OneTimePasswordGenerator.js'
import SendMail from '../utils/SendMail.js'
import { constant } from '../config/constant.js'

export const register = async (req, res) => {
    try {
        const result = validationResult(req)

        if (!result.isEmpty()) {
            return res.status(400).json({ success: false, msg: result.array() })
        }

        const { name, username, email, password } = req.body;

        const isUserAlreadyExist = await Users.findOne({ username })
        if (isUserAlreadyExist) {
            return res.status(400).json({ success: false, msg: "Username not available" })
        }

        const isEmailAlreadyExist = await Users.findOne({ email })
        if (isEmailAlreadyExist) {
            return res.status(400).json({ success: false, msg: "Email already exists" })
        }

        const salt = await bcryptjs.genSalt(12)
        const hashedPassword = await bcryptjs.hash(password, salt)

        await Users.create({
            name,
            username,
            email,
            password: hashedPassword
        })

        const otp = await OneTimePasswordGenerator()

        const expirationTimeInMilliseconds = Date.now() + parseInt(constant.OTP_EXPIRATION_MINUTE) * 60 * 1000

        OneTimePassword.create({
            otp,
            email,
            expiration: expirationTimeInMilliseconds
        })

        const mailOptions = {
            from: constant.EMAIL,
            to: email,
            subject: 'Verify Your Account',
            text: `Account Verification,\n${otp}`,
        }

        await SendMail(mailOptions)

        res.status(200).json({ success: true, msg: 'User Created' })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal Server Error.' })
    }
}


export const verifyEmail = async (req, res) => {
    try {
        const isOTP = await OneTimePassword.findOne({otp: req.body.otp})
        if(!isOTP){
            return res.status(404).json({success: false, msg: 'OTP Not Found'})
        }

        if(isOTP.expiration >= Date.now()){
            await OneTimePassword.findOneAndDelete({email: isOTP.email})
            return res.status(400).json({success: false, msg: "OTP expired"})
        }

        const isUser = await Users.findOne({email: isOTP.email})

        if(!isUser){
            return res.status(404).json({success: false, msg: 'User not found'})
        }

        await isUser.updateOne({verified: true})
        await OneTimePassword.deleteOne({email: isUser.email})
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal Server Error.' })
    }
}