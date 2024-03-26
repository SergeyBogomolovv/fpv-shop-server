import userService from '../services/user-service.js'

class userController {
  async beASeller(req, res, next) {
    try {
      const { INN, companyName, about } = req.body
      const newSeller = await userService.newSeller(
        req.params.id,
        INN,
        companyName,
        about
      )
      return res.json(newSeller)
    } catch (error) {
      next(error)
    }
  }
  async beAdmin(req, res, next) {
    try {
      const { message } = req.body
      const user = await userService.newAdmin(req.params.id, message)
      return res.json(user)
    } catch (error) {
      next(error)
    }
  }
  async getOneUser(req, res, next) {
    try {
      const user = await userService.getOne(req.params.id)
      return res.json(user)
    } catch (error) {
      next(error)
    }
  }
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAll()
      return res.json(users)
    } catch (error) {
      next(error)
    }
  }
  async updateProfile(req, res, next) {
    try {
      const id = req.params.id
      const { addres, companyName, INN, about } = req.body
      const updatedUser = await userService.update(id, {
        addres,
        companyName,
        INN,
        about,
      })
      return res.json(updatedUser)
    } catch (error) {
      next(error)
    }
  }
  async updateLogo(req, res, next) {
    try {
      const id = req.params.id
      const logo = req.files.logo
      const updatedUser = await userService.updateLogo(id, logo)
      return res.json(updatedUser)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      const deletedUser = await userService.delete(req.params.id)
      return res.json(deletedUser)
    } catch (error) {
      next(error)
    }
  }
}

export default new userController()
