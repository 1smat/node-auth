const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs');
class authController {

  async registration(req, res) {
    try {
      const { username, password } = req.body // берем user и paswword из тела запроса
      const checkerUser = await User.findOne({ username }) // проверяем есть ли такой юзернейм в базе
      if (checkerUser) { // если база что то вернула тогда error
        return res.status(400).json(message: 'Username is busy!')
      }

      bcrypt.hash("B4c0/\/", salt, function (err, hash) { });
      const user = new User({ username, })

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