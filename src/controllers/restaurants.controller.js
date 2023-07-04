const catchAsync = require("../utils/catchAsync")
const Restaurant = require('../models/restaurants.model')
const AppError = require("../utils/appError")

exports.createRestaurant = catchAsync( async(req, res, next) =>{
  const {name, address, rating} = req.body 

  const restaurant = await Restaurant.create(
    {name, address, rating}
  )

  res.status(200).json({
    status: 'success',
    message: 'Restaurant created succesfely',
    restaurant
  })
})


exports.findRestaurants = catchAsync( async(req, res, next) =>{
 const restaurants = await Restaurant.findAll({
  where:{
    status: 'active'
  }

 
 })
 return res.status(200).json({
  status: 'succes',
  message:' All good',
  restaurants
 })
})
exports.findRestaurant = catchAsync( async(req, res, next) =>{
  const {restaurant} = req.restaurant

  return res.status(200).json({
    status: 'succes',
    message: 'Restaurant found',
    restaurant
  })

})
exports.updateRestaurant = catchAsync( async(req, res, next) =>{
  const {name, address} = req.body
  const {restaurant} = req
  await  restaurant.update({name, address})

  return res.status(200).json({
    status: 'succes',
    message: 'The restaurant update',
    restaurant
  })
})
exports.disabledRestaurant = catchAsync( async(req, res, next) =>{
  const {restaurant} = req

  await restaurant.update({status: 'disabled'})

  return res.status(200).json({
    status: 'succes',
    message: 'The restaurant update',
    restaurant
  })

})
