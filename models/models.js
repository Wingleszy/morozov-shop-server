const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    full_name: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
},
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)


const Orders = sequelize.define('orders', {
    order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_date: { type: DataTypes.DATE }

})


const Order_items = sequelize.define('order_items', {
    order_item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER },
    price: { type: DataTypes.INTEGER },
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
)


const Products = sequelize.define('products', {
    product_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    img: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
})


const ProductsOrders = sequelize.define('products_orders')

User.hasMany(Orders, { foreignKey: 'customer_id' })
Orders.belongsTo(User, { foreignKey: 'customer_id' })

Orders.hasMany(Order_items, { foreignKey: 'order_id' })
Order_items.belongsTo(Orders, { foreignKey: 'order_id' })


Products.hasMany(Order_items, { foreignKey: 'product_id' })
Order_items.belongsTo(Products, { foreignKey: 'product_id' })

Products.belongsToMany(Orders, { through: ProductsOrders })
Orders.belongsToMany(Products, { through: ProductsOrders })

module.exports = {
    User,
    Orders,
    Order_items,
    Products,
    ProductsOrders
}