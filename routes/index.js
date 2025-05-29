const Router = require('express')

const router = new Router()
const orderRouter = require('./orderRouter')
const userRouter = require('./userRouter')
const productsRouter = require('./productsRouter')
const orderItemsRouter = require('./orderItemsRouter')

router.use('/user', userRouter)
router.use('/orderItems', orderItemsRouter)
router.use('/products', productsRouter)
router.use('/order', orderRouter)

module.exports = router