const { User } = require("../models/models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJWT = (id, email, role) => {
    return jwt.sign({id: id, email: email, role}, process.env.SECRET_KEY, {
        expiresIn: '24h'
    })
}

class UserController {
    async registration(req, res) {
        const {email, password, role, full_name} = req.body
        if (!email || !password) {
            return res.json('Введите логин/пароль')
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return res.json('Пользователь уже существует')
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, full_name, password: hashPassword})
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    } 
    async login(req, res) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        
        if (!user) {
            return res.json('Не найдено пользователя с данным email')
        }
        let comparePass = bcrypt.compareSync(password, user.password)
        if (!comparePass) {
            return res.json('Неправильный логин/пароль')
        }
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    } 
    async check(req, res) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        const user = await User.findOne({where: {email: req.user.email}})
        return res.json({token, id: user.user_id})
    } 
    async getOne(req, res) {
        const {email} = req.params
        const user = await User.findOne({
            where: {email}
        })
        return res.json(user)
    } 
}

module.exports = new UserController()