import productModel from '../models/product-model.js'
import userModel from '../models/user-model.js'
import UserDto from '../dtos/user-dto.js'
import mailService from './mail-service.js'
import orderModel from '../models/order-model.js'

class OrderService {
  async orderProduct(productId, userId, message) {
    try {
      const user = await userModel.findById(userId)
      const product = await productModel.findById(productId)
      const seller = await userModel.findById(product.sellerId)
      user.orders.push({
        _id: product._id,
        message,
        title: product.title,
        image: product.image,
        description: product.description,
        sellerId: product.sellerId,
        price: product.price,
        date: new Date(),
      })
      user.basket = user.basket.filter((id) => id != productId)
      await user.save()
      await mailService.sendOrderMail(
        seller.email,
        message,
        user.addres,
        product.title,
        product.price
      )
      const userInfo = new UserDto(user)
      await orderModel.create({
        title: product.title,
        productId: product._id,
        price: product.price,
        seller: seller._id,
        buyer: user._id,
        date: new Date(),
        message,
      })
      return userInfo
    } catch (error) {
      throw new Error(error)
    }
  }
  async clearOrders(userId) {
    try {
      const user = await userModel.findById(userId)
      user.orders = []
      await user.save()
      const userInfo = new UserDto(user)
      return userInfo
    } catch (error) {
      throw new Error(error)
    }
  }
  async getOrdersCount() {
    try {
      const count = await orderModel.countDocuments()
      return count
    } catch (error) {
      throw new Error(error)
    }
  }
  async getAllOrders(page) {
    try {
      const orders = await orderModel
        .find()
        .sort({ date: 1 })
        .skip(page * 10 - 10)
        .limit(10)
      return orders
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new OrderService()
