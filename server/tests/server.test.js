const expect = require('expect')
const request = require('supertest')

const { app } = require('./../server')
const { Todo } = require('./../models/todo')
const { user } = require('../models/user')

beforeEach((done) => {
  Todo.remove({}).then(() => done()) // Cleaning db
})

describe('POST /todos', () => {
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

        Todo.find().then(todos => {
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done()
        }).catch(e => done(e))
      })
  })
})