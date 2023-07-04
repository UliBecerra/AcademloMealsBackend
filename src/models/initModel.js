const Meal = require("./meals.model")
const Order = require("./orders.model")
const Restaurant = require("./restaurants.model")
const Review = require("./reviews.model")
const User = require("./users.model")


const initModel = () =>{

  Order.belongsTo(Meal)
  Meal.belongsTo(Order)

  User.hasMany(Review)
  Review.belongsTo(User)

  Restaurant.hasMany(Review)
  Review.belongsTo(Restaurant)

  User.hasMany(Order)
  Order.belongsTo(User)

  Restaurant.hasMany(Meal)
  Meal.belongsTo(Restaurant)



}
module.exports = initModel
