const { Orders } = require("../models/models")

class OrderController {
    async create(req, res) {
        const {customer_id} = req.body
        const order = await Orders.create({customer_id})
        return res.json(order)
    } 
    async getAll(req, res) {
        const {id} = req.params
        let orders = await Orders.findAll({
            where: {customer_id: id}
        })
        return res.json(orders)
    } 
    async getOne(req, res) {
        const {id} = req.params
        const order = await Orders.findOne({
            where: {order_id: id}
        })
        return res.json(order)
    } 
}

module.exports = new OrderController()