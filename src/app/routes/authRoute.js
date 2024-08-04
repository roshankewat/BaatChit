import express from 'express'
const router = express.Router()
import { register, verifyEmail } from '../controllers/AuthController.js'
import validateEmail from '../utils/ValidateEmail.js'
import validatePassword from '../utils/ValidatePassword.js'
import validateUsername from '../utils/ValidateUsername.js'

router.post('/register',validateEmail,validatePassword,validateUsername, register)
router.post('/verifyemail', verifyEmail)

export default router;

