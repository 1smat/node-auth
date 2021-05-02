const jwt = require('jsonwebtoken')
const { secret } = require('../config')
module.exports = function (roles) {
	return function(req, res, next) {
		if(req.method === 'OPTIONS') {
			next()
		}

		try {
			const token = req.headers.authorization.split(' ')[1] // делим токен на 2 части и берем 2-ю част  выташим токен из загаловки
			if(!token) { // если токена нет тогда эррор 403
				return res.status(403).json( {message: "User is not registred!"} )
			}
			const {roles: userRoles} = jwt.verify(token, secret)
			let hasRole = false
			user.Roles.forEach(role => {
				if (roles.includes(role)) {
					hasRole = true
				}
				if (!hasRole) {
					return res.status(403).json( {message: "Pravilage error !"} )
				}
			})
			next()
		} 
		catch (e) {
			console.log(e)
			return res.status(403).json( {message: "User is not registred!"} )
}
	}
}