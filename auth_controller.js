const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')
class authController {

  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
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

  async login(req, res) {
    try {

    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Login error' })
    }
  }


  async getUsers(req, res) {
    try {
      // Для создания ролей я уже 1 раз юзал так что в коммент

      // const userRole = new Role()
      // const adminRole = new Role({ value: 'ADMIN' })
      // await userRole.save()
      // await adminRole.save()



      res.json('server works')
    } catch (error) {

    }
  }

}

module.exports = new authController()