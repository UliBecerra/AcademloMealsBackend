const User = require("../models/users.model")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")
const Order = require("../models/orders.model")


exports.updateUser = catchAsync ( async ( req, res, next) =>{
  const {user} = req
  const {name, email} = req.body

  await user.update({name, email})

  res.status(200).json({
    status: 'succes',
    messsage:'The name and email updated'
  })
})
exports.deleteUser = catchAsync ( async ( req, res, next) =>{
  const {user} = req
  await user.update({status: 'disabled'})

  res.status(200).json({
    status: 'succes',
    messsage:'The user deleted'
  })

})

exports.findOrders = catchAsync( async ( req, res, next) =>{
  const user = await User.findOne({
    where:{
      id: req.sessionUser.id,
      status: 'active'
    },
    include:[
      {
        model: Order
      }
    ]
  })

  if(!user){
    return next( new AppError(`No orders`, 404) )
  }

  return res.status(200).json({
    status: 'succes',
    messsage: 'Orders found',
    user
  })
})
exports.findOrder = catchAsync( async ( req, res, next) =>{

  // TODO: Filtrar por id
  
  const user = await User.findOne({
    where:{
      id: req.sessionUser.id,
      status: 'active'
    },
    include:[
      {
        model: Order
      }
    ]
  })

  return res.status(200).json({
    status: 'succes',
    messsage: 'Orders found',
    user
  })

}) 