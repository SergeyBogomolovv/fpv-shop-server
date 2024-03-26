import productService from '../services/product-service.js'
import sellerService from '../services/seller-service.js'

class sellerController {
  async getOneSeller(req, res, next) {
    try {
      const seller = await sellerService.getOne(req.params.id)
      return res.json(seller)
    } catch (error) {
      next(error)
    }
  }
  async getAllSellers(req, res, next) {
    try {
      const sellers = await sellerService.getAll()
      return res.json(sellers)
    } catch (error) {
      next(error)
    }
  }
  async deleteSeller(req, res, next) {
    try {
      const deletedSeller = await sellerService.delete(req.params.id)
      return res.json(deletedSeller)
    } catch (error) {
      next(error)
    }
  }
  async getSellerProducts(req, res, next) {
    try {
      const sellerId = req.params.sellerId
      const page = req.query.page
      const limit = req.query.limit
      if (limit && page) {
        const products = await productService.getSellersProducts(
          sellerId,
          limit,
          page
        )
        return res.json(products)
      }
      const products = await productService.getSellersProducts(sellerId)
      return res.json(products)
    } catch (error) {
      next(error)
    }
  }
}
export default new sellerController()
