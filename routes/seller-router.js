import { Router } from 'express'
import sellerController from '../controllers/seller-controller.js'
import adminMiddleware from '../middlewares/admin-middleware.js'
const router = new Router()

router.get('/:id', sellerController.getOneSeller)
router.get('/', sellerController.getAllSellers)
router.delete('/:id', [adminMiddleware], sellerController.deleteSeller)
router.get('/:sellerId/products', sellerController.getSellerProducts)

export default router
