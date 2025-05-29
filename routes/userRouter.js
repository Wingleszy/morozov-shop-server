const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')


const router = new Router()

const userController = require('../controllers/userController')
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/:email', authMiddleware, userController.getOne)

module.exports = router

