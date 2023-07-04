const Restaurant = require("../models/restaurants.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validRestaurant = catchAsync( async(req, res, next) =>{
  const {id} = req.params

  const restaurant = await Restaurant.findOne({
    where:{
      id,
      status: 'active'
    }
  })
  if (!restaurant) {
    return next( new AppError(`The restaurant with id ${id} not found`, 404))
  }
  req.restaurant = restaurant

  next()
  
})