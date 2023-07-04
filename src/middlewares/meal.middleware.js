const Meal = require("../models/meals.model");
const Restaurant = require("../models/restaurants.model");
const catchAsync = require("../utils/catchAsync");

exports.findMeal = catchAsync( async(req, res, next) =>{
  const {id} = req.params

  const meal = await Meal.findOne({
    where:{
      id,
      status: 'active'
    },
    include: [
      {model: Restaurant}
    ]
  })

  
  if (!meal) {
    return next('The meal with id ${id} not found', 404)
  }
  req.meal = meal
  next()
})