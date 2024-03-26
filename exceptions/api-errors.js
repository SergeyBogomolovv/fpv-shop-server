export default class ApiError extends Error {
  status
  errors
  constructor(status, messages, errors = []) {
    super(messages)
    this.status = status
    this.messages = messages
    this.errors = errors
  }
  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован')
  }
  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors)
  }
  static NoAcces() {
    return new ApiError(403, 'У вас нет доступа')
  }
  static ServerError(message) {
    return new ApiError(501, message)
  }
}
