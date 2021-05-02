const jwt = require('jsonwebtoken')
const { secret } = require('../config')
module.exports = function (req, res, next) {
	if(req.method === 'OPTIONS') {
		next()
	}

	try {
		const token = req.headers.authorization.split(' ')[1] // делим токен на 2 части и берем 2-ю част  выташим токен из загаловки
		if(!token) { // если токена нет тогда эррор 403
			return res.status(403).json( {message: "User is not registred!"} )
		}
		// если токена есть то декодируем его
		const decodedData = jwt.verify(token, secret) 
		req.user = decodedData
		next()
	} 
	catch (e) {
		console.log(e)
		return res.status(403).json( {message: "User is not registred!"} )
	}
}	