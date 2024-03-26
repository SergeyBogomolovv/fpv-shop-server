import { Router } from 'express'
import userController from '../controllers/user-controller.js'
import adminMiddleWare from '../middlewares/admin-middleware.js'
import authMiddleware from '../middlewares/auth-middleware.js'
const router = new Router()

router.get('/', [adminMiddleWare], userController.getAllUsers)
router.get('/:id', userController.getOneUser)
router.put('/:id/beAseller', [authMiddleware], userController.beASeller)
router.put('/:id/beAdmin', userController.beAdmin)
router.put('/:id', [authMiddleware], userController.updateProfile)
router.put('/:id/updateLogo', [authMiddleware], userController.updateLogo)
router.delete('/:id', [adminMiddleWare], userController.delete)

export default router
