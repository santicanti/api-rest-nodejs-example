'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/hello/:name', (req, res) => {
  res.send({message: `hello ${req.params.name}`});
})
app.listen(port, () => {
  console.log(`API REST listening in http://localhost:${port}`);
})
