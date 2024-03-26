import ApiError from '../exceptions/api-errors.js'
import tokenService from '../services/token-service.js'

export default function (req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      throw ApiError.UnauthorizedError()
    }
    const accesToken = authHeader.split(' ')[1]
    if (!accesToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenService.validateAccesToken(accesToken)
    if (!userData) {
      throw ApiError.UnauthorizedError()
    }
    if (req.body.userId != userData.id) {
      throw ApiError.NoAcces()
    }
    req.user = userData
    next()
  } catch (error) {
    throw ApiError.BadRequest(error.message)
  }
}
