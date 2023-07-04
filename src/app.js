const express = require('express')
const app = express()

const usersRouter =  require('./routes/users.routes')
const mealsRouter = require('./routes/meals.routes')
const ordersRouter = require('./routes/orders.routes')
const restaurantsRouter = require('./routes/restaurants.routes')

const AppError = require('./utils/appError')
app.use(express.json());

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/meals', mealsRouter)
app.use('/api/v1/orders', ordersRouter)
app.use('/api/v1/restaurants', restaurantsRouter)

app.all('*', (req, res, next ) =>{
  return next( new AppError(`Can´t find ${req.originalUrl} on this server😔`, 404))
} )
module.exports = app
//TODO Para los endpoints /orders, se debe incluir la siguiente información:
//* La comida que se ordenó
//* El restaurant de donde se pidió la comida