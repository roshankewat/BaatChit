import mongoose from 'mongoose'
import { constant } from './constant.js'

const MONGO_URI = constant.MONGO_URI

const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        if(constant.NODE_ENV === 'developement'){
            console.log('Connected to database.')
        }
    } catch (error) {
        console.log(error)
    }
}

export default ConnectDB;