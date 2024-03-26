import orderService from '../services/order-service.js'

class OrderController {
  async orderProduct(req, res, next) {
    try {
      const productId = req.params.id
      const { userId, message } = req.body
      const user = await orderService.orderProduct(productId, userId, message)
      return res.json(user)
    } catch (error) {
      next(error)
    }
  }
  async deleteOrder(req, res, next) {
    try {
      const userId = req.params.id
      const user = await orderService.clearOrders(userId)
      return res.json(user)
    } catch (error) {
      next(error)
    }
  }
  async getAllOrders(req, res, next) {
    try {
      const orders = await orderService.getAllOrders(req.query.page)
      return res.json(orders)
    } catch (error) {
      next(error)
    }
  }
  async getCount(req, res, next) {
    try {
      const count = await orderService.getOrdersCount()
      return res.json(count)
    } catch (error) {
      next(error)
    }
  }
}

export default new OrderController()
