import { Router } from 'express'
import productController from '../controllers/product-controller.js'
import sellerMiddleware from '../middlewares/seller-middleware.js'
import basketMiddleware from '../middlewares/basket-middleware.js'
const router = new Router()

router.post('/addProduct', [sellerMiddleware], productController.addProduct)
router.get('/:id', productController.getOneProduct)
router.get('/getbycategory/:category', productController.getByCategory)
router.get('/:id/basket', productController.getBasket)
router.post('/addtobasket', [basketMiddleware], productController.addToBasket)
router.post(
  '/removefrombasket',
  [basketMiddleware],
  productController.removeFromBasket
)
router.get('/search/:title', productController.findProduct)
router.get('/', productController.getAllProducts)
router.delete('/:id', [sellerMiddleware], productController.deleteProduct)
router.put(
  '/:id/deleteimage',
  [sellerMiddleware],
  productController.deleteSecondImage
)
router.put(
  '/:id/addimage',
  [sellerMiddleware],
  productController.addSecondImage
)
router.put('/:id', [sellerMiddleware], productController.updateProduct)
router.put(
  '/:id/updateimage',
  [sellerMiddleware],
  productController.updateProductImage
)

export default router
