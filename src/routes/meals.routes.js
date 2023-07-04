const express = require("express");
const router = express.Router();

//Obtener todaslas comidas con status active
const mealController = require('../controllers/meals.controller')
const validationMiddleware = require('../middlewares/validations.middleware')
const userMiddleware = require('../middlewares/user.middleware')
const mealMiddleware = require('../middlewares/meal.middleware')
const restaurantsMiddleware = require('../middlewares/restaurants.middleware')

router.get('/',  mealController.findMeals)

router.get('/:id', mealMiddleware.findMeal, mealController.findMeal)
router.use(userMiddleware.protectUser)
router.route('/:id')
//Crear una nueva comida en el restaurant, siendo :id el id del restaurant (enviar name, price (INT) en req.body)

.post(userMiddleware.restrictTo('admin'), restaurantsMiddleware.validRestaurant, validationMiddleware.createMealValidation, mealController.createMeal)


//Obtener por id una comida con status active

//Actualizar comida (name, price)
.patch(userMiddleware.restrictTo('admin'), mealMiddleware.findMeal, validationMiddleware.updateMealValidation, mealController.updateMeal )
//Deshabilitar comida
.delete( userMiddleware.restrictTo('admin'), mealMiddleware.findMeal, mealController.deleteMeal)


module.exports = router
