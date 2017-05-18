'use strict'

const Product = require('../models/product')

function getProduct (req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: 'error finding product: ' + err})
    if (!product) return res.status(404).send({message: 'product doesnt exist'})

    res.status(200).send({product})
  })
}

function getProducts (req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({message: 'error finding products' + err})
    if (!products) return res.status(404).send({message: 'There are no products'})
    res.status(200).send({products})
  })
}

function createProduct (req, res) {
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
}

function updateProduct (req, res) {
  let productId = req.params.productId
  let update = req.body
  Product.findByIdAndUpdate(productId, update, (err) => {
    if (err) return res.status(500).send({message: 'error updating: ' + err})

    res.status(200).send({message: 'product updated'})
  })
}

function deleteProduct (req, res) {
  let productId = req.params.productId
  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: 'error deleting product: ' + err})

    product.remove(err => {
      if (err) return res.status(500).send({message: 'error deleting product: ' + err})
      res.status(200).send({message: 'Product deleted'})
    })
  })
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct
}
