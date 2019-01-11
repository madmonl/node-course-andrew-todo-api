const expect = require('expect')
const request = require('supertest')

const { app } = require('./../server')
const { Todo } = require('./../models/todo')
const { user } = require('../models/user')

const todos = [{
  text: 'I am the first todo'
}, {
  text: 'I am the second todo'
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos)
  }).then(done) // Cleaning db
})

describe('POST /todos', () => {
  const text = 'Test todo text'
  
  it('should create a new todo', (done) => {
    const text = 'Test todo text'

    request(app)
      .post('/todos')
      .send({text}) // Will be converted to json by supertests lib
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      }).end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find({ text }).then(todos => {
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done()
        }).catch(e => done(e))
      })
  })

  it('should not create a new todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({}) // Will be converted to json by supertests lib
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find().then(todos => {
          expect(todos.length).toBe(2)
          done()
        }).catch(e => done(e))
      })
  })
})

describe('GET /todos', () => {
  it('shouuld get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2)
      }).end(done)
  })
})
