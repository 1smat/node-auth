const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const { secret } = require('./config')
const generateAccessToken = (id, roles) => { // внутрь пайлода спрятим id и роль
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, secret, {expiresIn: '24h'}) // вернем токен и если он рабочий 24 часа
}

class authController {

  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) { // если массив ошибок не пустой тогда error
        return res.status(400).json({ message: 'Error on moment registation ', errors })
      }
      const { username, password } = req.body // берем user и paswword из тела запроса
      const checkerUser = await User.findOne({ username }) // проверяем есть ли такой юзернейм в базе
      if (checkerUser) { // если база что то вернула тогда error
        return res.status(400).json({ message: 'Username is busy!' })
      }

      const hashPassword = bcrypt.hashSync(password, 4); // если юзера не найдено базе хешируем пароль
      const userRole = await Role.findOne({ value: "USER" }) // РОЛЬ Юзера обычный юзер
      const user = new User({ username, password: hashPassword, roles: [] }) // передам хешпароль на базу
      await user.save() // save to db
      return res.json('Registration success ')

    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Registration error' })
    }
  }

  async login(req, res) { // авторизация
    try {
      const {username, password} = req.body // из тела запроса вытащим username и пароль
      const user = await User.findOne({username})  // найдем юзера с таким же username
      if(!user) { // если юзер не был найден
        return res.status(400).json({message: 'user with ${username} not found'}) // error
      }
      // если мы нашли юзера с таким username тогда сравним пароли
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({message: 'Введен неверный пароль!'}) // error
      }
      // генерируем json web token
      const token = generateAccessToken(user._id, // _id из монго
         user.roles)
      return res.json({token}) // вернем токен на клиент
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Login error' })
    }
  }


  async getUsers(req, res) {
    try {
      const users = await Users.find() // делаем запрос к базе данных
      res.json('worked', users)
    } catch (error) {

    }
  }

}

module.exports = new authController()
