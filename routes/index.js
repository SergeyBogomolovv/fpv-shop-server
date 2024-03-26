import { Router } from 'express'
import authRouter from './auth-router.js'
import productRouter from './product-router.js'
import userRouter from './user-router.js'
import sellerRouter from './seller-router.js'
import categoryRouter from './category-router.js'
import orderRouter from './order-router.js'

const router = new Router()

router.use('/auth', authRouter)
router.use('/products', productRouter)
router.use('/user', userRouter)
router.use('/seller', sellerRouter)
router.use('/categories', categoryRouter)
router.use('/orders', orderRouter)

export default router
