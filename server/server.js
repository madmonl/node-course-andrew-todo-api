var express = require('express')
var bodyParser = require('body-parser')

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user')
var { Todo } = require('./models/todo')

var app = express()

app.use(bodyParser.json())

app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res.send({ todos })
  }, e => res.status(400).send(e))
})



app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc)
  }, (e) => {
    res.status(400).send(e)
  })
})

app.listen(3000, () => {
  console.log('app listen on 3000')
})

module.exports = { app }
