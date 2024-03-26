import ApiError from '../exceptions/api-errors.js'
import productService from '../services/product-service.js'
import { validationResult } from 'express-validator'

class productController {
  async addProduct(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Заполните все поля', errors.array()))
      }
      const { title, price, description, sellerId, categories } = req.body
      let newCategories
      if (!Array.isArray(categories)) {
        newCategories = [categories]
      } else {
        newCategories = categories
      }
      const image = req.files.image
      const images = req.files.images
      const product = await productService.add(
        title,
        price,
        description,
        image,
        sellerId,
        newCategories,
        images
      )
      return res.json(product)
    } catch (error) {
      next(error)
    }
  }
  async findProduct(req, res, next) {
    try {
      const product = await productService.find(req.params.title)
      return res.json(product)
    } catch (error) {
      next(error)
    }
  }
  async getByCategory(req, res, next) {
    try {
      const products = await productService.findByCategory(req.params.category)
      return res.json(products)
    } catch (error) {
      next(error)
    }
  }
  async getOneProduct(req, res, next) {
    try {
      const product = await productService.getOne(req.params.id)
      return res.json(product)
    } catch (error) {
      next(error)
    }
  }
  async getAllProducts(req, res, next) {
    try {
      const productsInfo = await productService.getMany(
        req.query.page,
        req.query.limit
      )
      return res.json(productsInfo)
    } catch (error) {
      next(error)
    }
  }
  async deleteProduct(req, res, next) {
    try {
      const deletedProduct = await productService.delete(req.params.id)
      return res.json(deletedProduct)
    } catch (error) {
      next(error)
    }
  }
  async updateProduct(req, res, next) {
    try {
      const { title, price, description, categories } = req.body
      const updatedProduct = await productService.update(req.params.id, {
        title,
        price,
        description,
        categories,
      })
      return res.json(updatedProduct)
    } catch (error) {
      next(error)
    }
  }
  async updateProductImage(req, res, next) {
    try {
      const image = req.files.image
      const updatedProduct = await productService.updateImage(
        req.params.id,
        image
      )
      return res.json(updatedProduct)
    } catch (error) {
      next(error)
    }
  }
  async getBasket(req, res, next) {
    try {
      const products = await productService.getBasket(req.params.id)
      return res.json(products)
    } catch (error) {
      next(error)
    }
  }
  async addToBasket(req, res, next) {
    try {
      const product = await productService.addToBasket(
        req.body.productId,
        req.body.userId
      )
      return res.json(product)
    } catch (error) {
      next(error)
    }
  }
  async removeFromBasket(req, res, next) {
    try {
      const product = await productService.removeFromBasket(
        req.body.productId,
        req.body.userId
      )
      return res.json(product)
    } catch (error) {
      next(error)
    }
  }
  async deleteSecondImage(req, res, next) {
    try {
      const product = await productService.deleteSecondImage(
        req.params.id,
        req.body.image
      )
      return res.json(product)
    } catch (error) {
      next(error)
    }
  }
  async addSecondImage(req, res, next) {
    try {
      const product = await productService.addSecondImage(
        req.params.id,
        req.files.image
      )
      return res.json(product)
    } catch (error) {
      next(error)
    }
  }
}
export default new productController()
