import { body } from 'express-validator'

const validateUsername = [
    body('username')
    .notEmpty().withMessage('Username is required')
    .isLowercase().withMessage('Username should be in lowercase')
]

export default validateUsername;