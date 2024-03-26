import categoryModel from '../models/category-model.js'

class CategoryController {
  async getCategories(req, res, next) {
    try {
      const categories = await categoryModel.find()
      return res.json(categories)
    } catch (error) {
      next(error)
    }
  }
}
export default new CategoryController()
