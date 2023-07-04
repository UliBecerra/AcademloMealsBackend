const catchAsync = require('../utils/catchAsync')
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require("../utils/appError")
const User = require('../models/users.model')

exports.singup = catchAsync( async ( req, res, next ) =>{
  const {name, email, password } = req.body 
  console.log(req.body)
  const salt = await bcrypt.genSalt(10)
  const encryptedPass = await  bcrypt.hash( password, salt )

  const user = await User.create({
    name: name.toLowerCase(), 
    email: email.toLowerCase(), 
    password: encryptedPass,
  })

  const token = await generateJWT(user.id)

  return res.status(200).json({
    status: 'succes',
    message: 'User created ✏️',
    token,
    user:{
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    } 
  })

}
  )
exports.login = catchAsync( async ( req, res, next ) =>{
  const {email, password} = req.body

    const userFind = await User.findOne({
      where:{
        email: email.toLowerCase(),
        status: 'active'
      }
    })
    if (!userFind) {
      return next(new AppError(`User with email: ${email} not found`, '404'))
     }
     if (!(await bcrypt.compare(password, userFind.password))) {
      return next(new AppError(`incorrect email or password`, '401'))
     }
      const token = await generateJWT(userFind.id)

      res.status(200).json({
        status: 'succes',
        message: 'Welcome',
        token,
        user:{
          id: userFind.id,
          name: userFind.name,
          email: userFind.email,
          role: userFind.role
        }
      })
     
} )