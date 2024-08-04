import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        default: ""
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Users = mongoose.model('Users', userSchema)
export default Users;
