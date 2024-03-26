import { Router } from 'express'
import orderController from '../controllers/order-controller.js'
import activationMiddleware from '../middlewares/activation-middleware.js'
const router = new Router()

router.get('/all', orderController.getAllOrders)
router.get('/count', orderController.getCount)
router.put('/:id', activationMiddleware, orderController.orderProduct)
router.put('/:id/clear', orderController.deleteOrder)

export default router
