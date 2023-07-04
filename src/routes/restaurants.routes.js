const express = require("express");
const router = express.Router();
const restaurantController = require('../controllers/restaurants.controller')

const reviewController = require('../controllers/reviews.controller')
const restaurantsMiddleware = require('../middlewares/restaurants.middleware');
const { createReview } = require("../controllers/reviews.controller");
const validationMiddleware = require('../middlewares/validations.middleware')
const reviewMiddleware = require('../middlewares/review.middleware')

const userMiddleware = require('../middlewares/user.middleware')

router.get('/', restaurantController.findRestaurant)
router.get('/:id', restaurantController.findRestaurant)

router.use(userMiddleware.protectUser)

router.route('/', restaurantsMiddleware.validRestaurant, restaurantController.findRestaurant )
//Crear un nuevo restaurant(enviar name, address, rating (INT)) rating debeser un valor del 1 al 5
.post( validationMiddleware.createRestaurantValidation, userMiddleware.restrictTo('admin'), restaurantController.createRestaurant )
//Obtener todos los restaurants con status active
//.get( restaurantController.findRestaurants )

router.route('/:id')
//Obtener restaurant por id
//.get(restaurantsMiddleware.validRestaurant, restaurantController.findRestaurant )
//Actualizar restaurant (name, address)
.patch(userMiddleware.restrictTo('admin'), restaurantsMiddleware.validRestaurant,  restaurantController.updateRestaurant )
//Deshabilitar restaurant.
.delete(userMiddleware.restrictTo('admin'), restaurantsMiddleware.validRestaurant,  restaurantController.disabledRestaurant )


//Crear una nueva reseña en el restaurant, siendo :id el id del restaurant (enviar comment, rating (INT) en req.body)
router.post('/reviews/:id', validationMiddleware.createReviewValidatioin, reviewController.createReview)

//TODO: Ver el funcionamiento de la req.params
router.route('/reviews/:restaurantId/:id')
//Actualizar una reseña hecha en un restaurant, siendo :id el id del review y restaurantId el id del restaurant(comment, rating) SOLO EL AUTOR DE LA RESEÑA PUEDE ACTUALIZAR SU PROPIA RESEÑA

.patch(reviewMiddleware.validReviewRestaurantId ,validationMiddleware.updateReviewRestaurantValidation, reviewController.updateReviewRestaurant )

//Actualizar una reseña hecha en un restaurant a status deleted, siendo :id el id del review y restaurantId el id del restaurant. SOLO EL AUTOR DE LA RESEÑA PUEDE ACTUALIZAR SU PROPIA RESEÑA
.delete(reviewMiddleware.validReviewRestaurantId, reviewController.disabledReviewRestaurant )


module.exports = router

