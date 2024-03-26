import userModel from '../models/user-model.js'
import SellerDto from '../dtos/seller-dto.js'
import ApiError from '../exceptions/api-errors.js'

class sellerService {
  async getOne(id) {
    const seller = await userModel.findById(id)
    if (!seller) {
      throw ApiError.BadRequest('Пользователя не существует')
    }
    if (!seller.roles.includes('SELLER')) {
      throw ApiError.BadRequest('Это не продавец')
    }
    const sellerInfo = new SellerDto(seller)
    return sellerInfo
  }
  async getAll() {
    const sellers = await userModel.find({ roles: { $all: ['SELLER'] } })
    const sellersInfo = sellers.map((seller) => new SellerDto(seller))
    return sellersInfo
  }
  async delete(id) {
    const seller = await userModel.findByIdAndDelete(id)
    if (!seller) {
      throw ApiError.BadRequest('Пользователя не существует')
    }
    const sellerInfo = new SellerDto(seller)
    return sellerInfo
  }
}

export default new sellerService()
