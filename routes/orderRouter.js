const Router = require('express')
const orderController = require('../controllers/orderController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', checkRoleMiddleware('ADMIN USER'), orderController.create)
router.get('/user/:id', checkRoleMiddleware('ADMIN USER'), orderController.getAll)
router.get('/:id', checkRoleMiddleware('ADMIN USER'), orderController.getOne)

module.exports = router