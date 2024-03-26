import UserDto from '../dtos/user-dto.js'
import ApiError from '../exceptions/api-errors.js'
import userModel from '../models/user-model.js'
import productModel from '../models/product-model.js'

import fileService from './file-service.js'

class userService {
  async newAdmin(id, message) {
    const user = await userModel.findById(id)
    if (!user.isActivated) {
      throw ApiError.BadRequest(
        'Чтобы стать администратором, вам нужно подтвердить свою учетную запись'
      )
    }
    if (user.roles.includes('ADMIN')) {
      throw ApiError.BadRequest('Вы уже администратор')
    }
    console.log(message)
    user.roles.push('ADMIN')
    await user.save()
    const userInfo = new UserDto(user)
    return userInfo
  }
  async newSeller(id, INN, companyName, about) {
    const user = await userModel.findById(id)
    if (!user.isActivated) {
      throw ApiError.BadRequest(
        'Чтобы стать продавцом, вам нужно авторизироваться'
      )
    }
    if (!INN) {
      throw ApiError.BadRequest('Укажите инн!')
    }
    user.roles.push('SELLER')
    user.INN = INN
    user.companyName = companyName
    user.about = about
    await user.save()
    const userInfo = new UserDto(user)
    console.log(userInfo)
    return userInfo
  }
  async getOne(id) {
    const user = await userModel.findById(id)
    if (!user) {
      throw ApiError.BadRequest('Пользователя не существует')
    }
    const userInfo = new UserDto(user)
    return userInfo
  }
  async getAll() {
    const users = await userModel.find()
    const newUsers = users.map((user) => new UserDto(user))
    return newUsers
  }
  async updateLogo(id, logo) {
    const user = await userModel.findById(id)
    if (!user) {
      throw ApiError.BadRequest('Пользователя не существует')
    }
    const updatedLogo = fileService.changeFile(logo, user.logo)
    user.logo = updatedLogo
    await user.save()
    const userInfo = new UserDto(user)
    return userInfo
  }
  async update(id, body) {
    const user = await userModel.findById(id)
    if (!user) {
      throw ApiError.BadRequest('Пользователя не существует')
    }
    if (body.INN) user.INN = body.INN
    if (body.companyName) user.companyName = body.companyName
    if (body.addres) user.addres = body.addres
    if (body.about) user.about = body.about
    await user.save()
    const userInfo = new UserDto(user)
    return userInfo
  }
  async delete(id) {
    const user = await userModel.findByIdAndDelete(id)
    if (user.roles.includes('SELLER')) {
      const userProducts = await productModel.find({ sellerId: user._id })
      userProducts.forEach(async (product) => {
        await productModel.findByIdAndDelete(product._id)
      })
    }
    fileService.deleteFile(user.logo)
    if (!user) {
      throw ApiError.BadRequest('Пользователя не существует')
    }
    const userInfo = new UserDto(user)
    return userInfo
  }
}
export default new userService()
