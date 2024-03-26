import jwt from 'jsonwebtoken'
import tokenModel from '../models/token-model.js'

class tokenService {
  async createTokens(payload) {
    const accesToken = jwt.sign(payload, process.env.JWT_ACCES_SECRET, {
      expiresIn: '30m',
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    })
    return { accesToken, refreshToken }
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await tokenModel.create({ user: userId, refreshToken })
    return token
  }
  async removeToken(refreshToken) {
    const tokenData = await tokenModel.findOneAndDelete({ refreshToken })
    return tokenData
  }
  validateAccesToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCES_SECRET)
      return userData
    } catch (error) {
      return null
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (error) {
      return null
    }
  }
  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken })
    return tokenData
  }
}

export default new tokenService()
