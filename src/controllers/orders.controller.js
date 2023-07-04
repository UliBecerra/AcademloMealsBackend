const Meal = require("../models/meals.model")
const Order = require("../models/orders.model")
const Restaurant = require("../models/restaurants.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

exports.createOrder = catchAsync( async (req, res, next) =>{
  const {quantity, mealId} = req.body

  const meal = await  Meal.findOne({
    where:{
      status: 'active',
      id: mealId
    }
  })

  if (!meal) {
    return next( new AppError(`The meal with id ${mealId} not found`, 404))
  }

  const totalPrice = meal.price * quantity
  const userId = req.sessionUser.id
  const order = await Order.create({
    quantity, mealId, userId, totalPrice
  })

  return res.status(200).json({
    status: 'succes',
    message: 'The order created',
    totalPrice: order.totalPrice,
    mealId: order.mealId,
    quantity: order.quantity
  })
})
exports.findOrders = catchAsync( async (req, res, next) =>{
 
  const userId = req.sessionUser.id 
  const orders = await Order.findAll({
    where: {
      status: 'active',
      userId
    },
    include:[{
      model: Meal,
      include:Restaurant
    },
    
  ]
  })

/*   console.log(orders.meal.id)
  const restaurant = await Restaurant.findOne({
    where:{
      status:'active',
      id: orders.meal.restaurantId
    }
  })
  orders.restaurant = restaurant */
  return res.status(200).json({
    status: 'succes',
    message: 'Orders found',
    orders
    
  })

})
exports.updateOrder = catchAsync( async (req, res, next) =>{
  const {order} = req
  await order.update({status: 'completed'})
})
exports.deleteOrder = catchAsync( async (req, res, next) =>{
  const {order} = req
  await order.update({status: 'cancelled'})

})