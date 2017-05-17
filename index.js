'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/product', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({message: 'error finding products' + err})
    if (!products) return res.status(404).send({message: 'There are no products'})
    res.status(200).send({products})
  })
})

app.get('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: 'error finding product: ' + err})
    if (!product) return res.status(404).send({message: 'product doesnt exist'})

    res.status(200).send({product})
  })
})

app.post('/api/product', (req, res) => {
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, storedProduct) => {
    if (err) return res.status(500).send({message: 'error saving product: ' + err})
    res.status(200).send({product: storedProduct})
  })
})

app.put('/api/product/:productId', (req, res) => {

})

app.delete('/api/product/productId', (req, res) => {

})

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if (err) throw err
  console.log('Database connection established')

  app.listen(port, () => {
    console.log(`API REST listening in http://localhost:${port}`)
  })
})
