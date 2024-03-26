import ApiError from '../exceptions/api-errors.js'
import categoryModel from '../models/category-model.js'
import productModel from '../models/product-model.js'
import userModel from '../models/user-model.js'
import fileService from './file-service.js'

class ProductService {
  async getBasket(userId) {
    const user = await userModel.findById(userId)
    let i = 0
    const products = []
    if (user.basket.length == 0) {
      return []
    }
    while (i < user.basket.length) {
      const product = await productModel.findById(user.basket[i])
      if (product) products.push(product)
      i++
    }
    return products
  }
  async getSellersProducts(sellerId, limit, page) {
    if (limit & page) {
      const count = await productModel.find({ sellerId }).countDocuments()
      const products = await productModel
        .find({ sellerId })
        .skip(page * limit - limit)
        .limit(limit)
      return { products, count }
    }
    const products = await productModel.find({ sellerId })
    const count = await productModel.find({ sellerId }).countDocuments()
    return { products, count }
  }
  async find(query) {
    if (!query) {
      throw new ApiError.BadRequest()
    }
    const product = await productModel.find({
      title: { $regex: query },
    })
    return product
  }
  async add(title, price, description, image, sellerId, categories, images) {
    const imageName = fileService.saveFile(image)
    const imagesNames = []
    images.forEach((img) => {
      const imgName = fileService.saveFile(img)
      imagesNames.push(imgName)
    })
    categories.forEach(async (category) => {
      const isCategory = await categoryModel.findOne({ value: category })
      if (!isCategory) {
        await categoryModel.create({ value: category })
      }
    })
    const product = await productModel.create({
      title,
      price,
      description,
      image: imageName,
      sellerId,
      categories: [...categories],
      images: imagesNames,
    })
    return product
  }
  async getOne(id) {
    const product = await productModel.findById(id)
    return product
  }
  async findByCategory(category) {
    const products = await productModel.find({
      categories: { $all: [category] },
    })
    return products
  }
  async getMany(page, limit) {
    const products = await productModel
      .find()
      .skip(page * limit - limit)
      .limit(limit)
    const count = await productModel.find().countDocuments()
    return { products, count }
  }
  async delete(id) {
    const product = await productModel.findByIdAndDelete(id)
    product.images.forEach((img) => {
      fileService.deleteFile(img)
    })
    fileService.deleteFile(product.image)
    return product
  }
  async update(id, body) {
    const product = await productModel.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    )
    return product
  }
  async updateImage(id, image) {
    const product = await productModel.findById(id)
    const newImage = fileService.changeFile(image, product.image)
    product.image = newImage
    await product.save()
    return product
  }
  async addToBasket(productId, userId) {
    const product = await productModel.findById(productId)
    if (!product) {
      throw ApiError.BadRequest('Товар не найден')
    }
    const user = await userModel.findById(userId)
    if (!user) {
      throw ApiError.ServerError('Пользователь не найден')
    }
    let isAdded = false
    user.basket.forEach((p) => {
      if (p == productId) {
        isAdded = true
      }
    })
    if (isAdded) {
      throw ApiError.BadRequest('в корзине уже есть')
    }
    user.basket.push(product._id)
    await user.save()
    return product
  }
  async deleteSecondImage(id, image) {
    const product = await productModel.findById(id)
    fileService.deleteFile(image)
    product.images = product.images.filter((img) => img !== image)
    product.save()
    return product
  }
  async addSecondImage(id, image) {
    const product = await productModel.findById(id)
    const img = fileService.saveFile(image)
    product.images = [...product.images, img]
    product.save()
    console.log(product)
    return product
  }
  async removeFromBasket(productId, userId) {
    const product = await productModel.findById(productId)
    if (!product) {
      throw ApiError.BadRequest('Товар не найден')
    }
    const user = await userModel.findById(userId)
    if (!user) {
      throw ApiError.ServerError('Пользователь не найден')
    }
    user.basket = user.basket.filter((pId) => pId != productId)
    await user.save()
    return product
  }
}

export default new ProductService()
