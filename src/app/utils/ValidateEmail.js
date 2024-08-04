import { body } from 'express-validator'

const validateEmail = [
    body('email').isEmail().withMessage('Please enter a valid email address')
]

export default validateEmail;