const Order = require("../models/orders.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.findOrder = catchAsync( async(req, res, next) =>{
    const {id} = req.params

    const order = await Order.findOne({
      where:{
        id,
        status: 'active'
      }
    })

    if(!id) return next( new AppError('The order not found', 404))

    req.order = order

    next()
})
exports.protectOrderOwner = catchAsync (async (req, res, next)  =>{
  const {order, sessionUser} = req

    if( order.userId !== sessionUser.id ){
      return next( new AppError('You dont own this account .', 401))
    }
    next()
})