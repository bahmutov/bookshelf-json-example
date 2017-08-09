const User = require('./user')
const connection = require('./connection')
const Bluebird = require('bluebird')

function addUser () {
  User.forge({
    email: 'foo4@gmail.com',
    password: 'test',
    meta: {
      foo: 'bar'
    }
  }).save()
    .then(console.log, console.error)
}

function selectUsers () {
  User.fetchAll() // returns Collection
  .then(collection => {
    const users = []
    collection.each(user => {
      users.push(user.fetch().then(b => b.toJSON()))
    })
    return Bluebird.all(users)
  })
  .then(console.log, console.error)
}

// addUser()
selectUsers()

setTimeout(() => {
  console.log('closing DB')
  connection.destroy()
    .then(() => 'closed DB')
    .catch(console.error)
}, 2000)
