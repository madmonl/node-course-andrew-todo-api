const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect ro MongoDB server')
  }
  console.log('Connected to MongoDB server')

  // db.collection('Users').deleteMany({name: 'liad'}).then(result => {
  //   console.log(result)
  // })
  db.collection('Todos').findOneAndDelete({_id: ObjectID('5c277bfa51b9123d709b07f6')}).then(result => {
    console.log(result)
  })

  db.close()
})