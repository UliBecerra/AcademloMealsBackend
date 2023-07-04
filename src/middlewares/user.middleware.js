const User = require("../models/users.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const  {promisify} = require('util')
const jwt = require('jsonwebtoken')

exports.validUser = catchAsync( async (req, res, next) =>{
  const {id} = req.params

  const user = await User.findOne({
    id,
    status:'active'
  })
  if(!user){
    return next(new AppError( `The user with id ${id} not found`, 404))
  }

  req.user = user

  next()

})

exports.protectUser = catchAsync ( async ( req, res, next ) =>{
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')       
  ) {
    
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token){
    return next( new AppError('You are not logged, please log in to get access', 401))
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  )

  const user = await User.findOne({
    where:{
      id: decoded.id,
      status: 'active'
    }
   })

   if (!user) {
    return next( new AppError('the owner of this token is not longed available', 401))
   }  
   if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      user.passwordChangedAt.getTime() /1000, 10
    )
    if(decoded.iat < changedTimeStamp){
      return next(
        new AppError('the user recently changed password, please login again ')
      )
     }
   }
   req.sessionUser = user

   next(); 
})

exports.protectAccountOwner = catchAsync (async (req, res, next)  =>{
  const {user, sessionUser} = req

    if( user.id !== sessionUser.id ){
      return next( new AppError('You dont own this account .', 401))
    }
    next()
})

exports.restrictTo = (...roles) =>{
  return (req, res, next) =>{
    console.log(req.sessionUser)
    if (!roles.includes(req.sessionUser.role)){
      return next(new AppError('You dont have permission to perform this actionadf.', 403)) 
    }
    next()
  }

} 