'use strict'

const app = require('./app')
const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
  if (err) throw err
  console.log('Database connection established')

  app.listen(config.port, () => {
    console.log(`API REST listening in http://localhost:${config.port}`)
  })
})
