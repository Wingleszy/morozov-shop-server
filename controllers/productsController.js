const uuid = require('uuid')
const path = require('path')
const { Products } = require('../models/models')

class ProductsController {
    async create(req, res) {
        const {name, price, description} = req.body
        const {img} = req.files
        
        let fileName = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const product = await Products.create({name, price, img: fileName, description})
        return res.json(product)
    } 
    async getAll(req, res) {
       let products = await Products.findAll()
       return res.json(products)
    } 
    async getOne(req, res) {
        const {id} = req.params
        const product = await Products.findOne({
            where: {product_id: id}
        })
        return res.json(product)
    } 
    async deleteOne(req, res) {
        try {
            const {id} = req.params
            const product = await Products.destroy({
                where: { product_id: id }
            });
            return res.json({message: 'Товар удален', id})
        } catch (error) {
            if(error.message = 'UPDATE или DELETE в таблице "products" нарушает ограничение внешнего ключа "order_items_product_id_fkey" таблицы "order_items') {
                return res.json('Невозможно удалить товар, который есть в корзине или в заказах у пользователей!')
            }
            return res.json(error.message)
        }
    } 
}

module.exports = new ProductsController()