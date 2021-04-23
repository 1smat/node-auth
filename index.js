const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const conUrl = 'mongodb+srv://qwerty:qwerty1234@cluster0.qyjr0.mongodb.net/node-authn?retryWrites=true&w=majority'


const app = express()

app.use(express.json())

const start = async () => {
  try {
    await mongoose.connect(conUrl)
    app.listen(PORT, () => console.log(`server started at ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()