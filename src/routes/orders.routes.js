const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orders.controller")
const validationMiddleware = require('../middlewares/validations.middleware')
const userMiddleware = require('../middlewares/user.middleware')
const orderMiddleware = require('../middlewares/order.middleware')


router.use(userMiddleware.protectUser)
//Crear una nueva order (enviar quantity y mealId por req.body)

router.post('/', validationMiddleware.createOrderValidation, orderController.createOrder)


//Obtener todas las órdenes del usuario
router.get('/me',  orderController.findOrders)


router.route('/id', )


//Marcar una orden por id con status completed
.patch(orderMiddleware.protectOrderOwner ,orderMiddleware.findOrder, orderController.updateOrder)

//Marcar una orden por id con status completed
.delete(orderMiddleware.protectOrderOwner, orderMiddleware.findOrder, orderController.deleteOrder)


module.exports = router
