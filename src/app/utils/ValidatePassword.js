import { body } from 'express-validator'

const validatePassword = [
    body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain a number')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character')
]

export default validatePassword;