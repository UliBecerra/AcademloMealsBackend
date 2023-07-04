const {body, validationResult} = require('express-validator')

const validFields = (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped()
    })
  }
next()
}
exports.createUserValidator = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email').notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Must be a valid email'),
  body('password').notEmpty().withMessage('Password cannot be empty').isLength({min:8, max:16}).withMessage('Passsword must be least 8 characters long'),
  
  validFields,
]

exports.loginUserValidator = [
  body('email').notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Must be a valid email'),
  body('password').notEmpty().withMessage('Password cannot be empty').isLength({min:8, max:16}).withMessage('Passsword must be least 8 characters long'),
  validFields,
]
//isFloat
exports.updateUserValidator = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email').notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Must be a valid email'),
  validFields
]

exports.createRestaurantValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address').notEmpty().withMessage('Address cannot be empty'),
  body('rating').notEmpty().withMessage('Rating cannot be empty').isInt({min:1, max:5}).withMessage('Rating debe estar entre 1 y 5'),
  validFields,
]



exports.createReviewValidatioin = [
  body('comment').notEmpty().withMessage('Comment cannot be empty'),
  body('rating').notEmpty().withMessage('Rating cannot be empty').isInt({min:1, max:5}).withMessage('Rating debe estar entre 1 y 5'),
  validFields,

]
exports.updateReviewRestaurantValidation = [
  //comment, rating
  body('comment').notEmpty().withMessage('Comment cannot be empty'),
  body('rating').notEmpty().withMessage('Rating cannot be empty').isInt({min:1, max:5}).withMessage('Rating debe estar entre 1 y 5'),
  validFields,
]
exports.createMealValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('price').notEmpty().withMessage('Price cannot be empty').isInt().withMessage('The price isn´t type int'),
  validFields
]


exports.updateMealValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('price').notEmpty().withMessage('Price cannot be empty').isInt().withMessage('The price isn´t type int'),
  validFields
]

exports.createOrderValidation = [
  body('quantity').notEmpty().withMessage('quantity cannnot be empty'),
  body('mealId').notEmpty().withMessage('The mealId cannot be empty ').isInt().withMessage('The price isn´t type int'),
  validFields
]