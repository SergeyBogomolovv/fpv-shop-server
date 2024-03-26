import userModel from '../models/user-model.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import tokenService from './token-service.js'
import UserDto from '../dtos/user-dto.js'
import ApiError from '../exceptions/api-errors.js'
import mailService from './mail-service.js'
import fileService from './file-service.js'

class authService {
  async registration(email, password, addres, logo, isAdmin) {
    const canditate = await userModel.findOne({ email })
    if (canditate) {
      throw ApiError.BadRequest('Пользователь существует')
    }
    const hashPassword = await bcrypt.hash(password, 7)
    const activationLink = uuid()
    const logoName = fileService.saveFile(logo)
    const date = new Date()
    const newUser = await userModel.create({
      email,
      password: hashPassword,
      activationLink,
      addres,
      logo: logoName,
      roles: ['USER'],
      date,
    })
    if (isAdmin === 'yes') {
      newUser.roles.push('ADMIN')
      await newUser.save()
    }
    const userDto = new UserDto(newUser)
    const tokens = await tokenService.createTokens({
      id: userDto.id,
      roles: userDto.roles,
      INN: userDto.INN,
      isActivated: userDto.isActivated,
    })
    await tokenService.saveToken(userDto._id, tokens.refreshToken)
    await mailService.sendActivationMail(
      email,
      `${process.env.SERVER_URL}/api/auth/activate/${activationLink}`
    )
    return { ...tokens, user: userDto }
  }
  async login(email, password) {
    const user = await userModel.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден')
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      throw ApiError.BadRequest('Пароль не подходит')
    }
    const userDto = new UserDto(user)
    const tokens = await tokenService.createTokens({
      id: userDto.id,
      roles: userDto.roles,
      INN: userDto.INN,
      isActivated: userDto.isActivated,
    })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }
  async activate(activationLink) {
    const user = await userModel.findOne({ activationLink })
    if (!user) {
      throw ApiError.BadRequest('неправильная ссылка')
    }
    user.isActivated = true
    await user.save()
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }
    const user = await userModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = await tokenService.createTokens({
      id: userDto.id,
      roles: userDto.roles,
      INN: userDto.INN,
      isActivated: userDto.isActivated,
    })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }
}
export default new authService()
