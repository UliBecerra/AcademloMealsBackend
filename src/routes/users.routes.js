const express = require("express");
const router = express.Router();

const authController = require('../controllers/auth.controller')
const userController = require('../controllers/users.controller')
const userMiddleware = require('../middlewares/user.middleware')
const validationMiddleware = require('../middlewares/validations.middleware')

router
.post('/signup',   validationMiddleware.createUserValidator, authController.singup)
.post('/login', validationMiddleware.loginUserValidator,  authController.login)
 
router
.use(userMiddleware.protectUser)
.route('/:id')

.patch(userMiddleware.validUser, userMiddleware.protectAccountOwner , validationMiddleware.updateUserValidator,  userController.updateUser )
.delete( userMiddleware.validUser, userMiddleware.protectAccountOwner ,  userController.deleteUser )

router.get('/orders', userController.findOrders)
router.get('/orders/:id', userController.findOrder)

module.exports = router
