const Router = require('express')
const productsController = require('../controllers/productsController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', checkRoleMiddleware('ADMIN'), productsController.create)
router.get('/', productsController.getAll)
router.get('/:id', productsController.getOne)
router.delete('/:id', productsController.deleteOne)

module.exports = router