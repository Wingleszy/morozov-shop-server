const Router = require('express')
const { Order_items } = require('../models/models')
const orderItemsController = require('../controllers/orderItemsController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', checkRoleMiddleware('ADMIN USER'), orderItemsController.create)
router.get('/', checkRoleMiddleware('ADMIN USER'), orderItemsController.getAll)

module.exports = router