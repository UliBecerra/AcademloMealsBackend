const Review = require("../models/reviews.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validReviewRestaurantId = catchAsync( async (req, res, next) =>{
  
const {id} = req.params
const {restaurantId} =req.params

const review = await Review.findOne({
  where:{
    id,
    restaurantId,
    status: 'active'
  }

})

if (!review) {
  return next( new AppError('The review id not found'),404)
}

  req.review = review
  next()

})