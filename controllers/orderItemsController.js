const { Order_items, Products } = require("../models/models")

class OrdersItemsController {
    async create(req, res) {
        const {quantity, price, product_id, order_id} = req.body
        const orderItems = await Order_items.create({quantity, price, product_id, order_id})
        return res.json(orderItems)
    } 
    async getAll(req, res) {
        const orderItems = await Order_items.findAll({
            where: { order_id: req.query.order_id},
            include: [{
              model: Products,
              attributes: ['product_id', 'name', 'price', 'img', 'description']
            }]
          });
        return res.json(orderItems)
    } 
}

module.exports = new OrdersItemsController()