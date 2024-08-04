import mongoose from "mongoose";
import { Schema } from "mongoose";

const otpSchema = new Schema({
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    expiration:{
        type: String,
        required: true
    }
}, {timestamps: true})

const OneTimePassword = mongoose.model('Otp', otpSchema)
export default OneTimePassword;
