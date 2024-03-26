import { Router } from 'express'
import authController from '../controllers/auth-controller.js'
import { body } from 'express-validator'
const router = new Router()

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 4, max: 15 }),
  authController.registration
)

router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refresh)

export default router
