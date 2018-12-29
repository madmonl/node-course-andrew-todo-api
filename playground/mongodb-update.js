const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect ro MongoDB server')
  }
  console.log('Connected to MongoDB server')

  // db.collection('Users').deleteMany({name: 'liad'}).then(result => {
  //   console.log(result)
  // })
  db.collection('Todos').findOneAndUpdate({
    _id: ObjectID('5c2780ff9f49ae2f3c7e05cd')
    }, {
      $set: {
        name: 'hila'
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    }).then(result => {
    console.log(result)
  })

  db.close()
})