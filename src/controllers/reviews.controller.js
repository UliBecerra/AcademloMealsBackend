const Review = require('../models/reviews.model')
const catchAsync = require("../utils/catchAsync")

const AppError = require("../utils/appError")

exports.createReview = catchAsync( async (req, res, next) =>{

  const restaurantId = req.params.id

  const {comment, rating} = req.body
  const userId = req.sessionUser.id
  const review = await Review.create({
    restaurantId, comment, rating, userId
  })

  return res.status(200).json({
    status: 'succes',
    message: 'Review created',
    review
  })
  

})

exports.updateReviewRestaurant = catchAsync( async  (req, res, next) =>{
  const {review} = req
  
  const {comment, rating} = req.body

  
  await review.update({comment, rating})

  return res.status(200).json({
    status: 'succes',
    message: 'The review update',
    review
  })
})

exports.disabledReviewRestaurant = catchAsync( async (req, res, next) => {

  const {review} = req
console.log(review)
  await review.update({status: 'deleted'})

  return res.status(200).json({
    status: 'succes',
  message: ' The review deleted'
  })
})