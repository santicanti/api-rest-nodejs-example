'use strict'

const express = require('express')
const api = express.Router()
const auth = require('../middlewares/auth')
const ProductController = require('../controllers/product')
const UserController = require('../controllers/user')

api.get('/product', ProductController.getProducts)
api.get('/product/:productId', ProductController.getProduct)
api.post('/product', auth, ProductController.createProduct)
api.put('/product/:productId', auth, ProductController.updateProduct)
api.delete('/product/:productId', auth, ProductController.deleteProduct)
api.get('/private', auth, function (req, res) {
  res.status(200).send({ message: 'You have access' })
})
api.post('/signin', UserController.signIn)
api.post('/signup', UserController.signUp)

module.exports = api
