// @ts-nocheck
const Router = require('express')
const router = new Router()
const controller = require('./auth_controller')
const { check } = require('express-validator')
const authMiddleware = require('./middlewares/authMiddleware')
const roleMiddleware = require('./middlewares/roleMiddleware')

router.post('/registration', [
  check('username', 'username is empty! check it!').notEmpty(),
  check('password', 'Password should be from 4 to 8 symbols').isLength({ min: 4, max: 8 })
], controller.registration)
router.post('/login', controller.login)
// router.get('/users', authMiddleware ,controller.getUsers)
router.get('/users', roleMiddleware(["ADMIN"]) ,controller.getUsers) // MIDDLEWARESd

module.exports = router
