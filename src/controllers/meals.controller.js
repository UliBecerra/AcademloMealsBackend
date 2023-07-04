const catchAsync = require("../utils/catchAsync")
const Meal = require('../models/meals.model')

exports.findMeals = catchAsync( async (req, res, next ) =>{

  const meals = await Meal.findAll({
    where:{
      status: 'active' 
    }
  })

  return res.status(200).json({
    status: 'success',
    message: 'The meals found',
    meals
  })
})
exports.createMeal = catchAsync( async (req, res, next ) =>{
  const restaurantId = req.params.id

  const {name, price}= req.body

  const meal = await Meal.create({
    name, price, restaurantId
  })

  return res.status(200).json({
    status: 'Succes',
    message: 'The meeal created',
    meal
  })
  
})
exports.findMeal = catchAsync( async (req, res, next ) =>{

  const {meal} = req
console.log(meal)
  return res.status(200).json({
    status: 'succes',
    message: 'Meal found',
    meal
  })
  
})
exports.updateMeal = catchAsync( async (req, res, next ) =>{

  const {meal} = req

  const {name, price} = req


  await meal.update({name, price})
  
  return res.status(200).json({
    status: 'succes',
    message: 'Meal update',
  })

})
exports.deleteMeal = catchAsync( async (req, res, next ) =>{
  
  const {meal} = req

  await meal.update({status: 'disabled'})
  
  return res.status(200).json({
    status: 'succes',
    message: 'Meal deleted',
  })
})