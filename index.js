const User = require('./user')
const connection = require('./connection')
function exit() {
  console.log('closing DB')
  connection.destroy()
    .then(() => 'closed DB')
    .catch(console.error)
}
function addUser () {
  return User.forge({
    email: 'foo@gmail.com',
    name: 'Mr Foo',
    meta: {
      foo: 'bar'
    }
  }).save()
    .then(console.log, console.error)
}

function selectUsers () {
  const Bluebird = require('bluebird')
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

addUser().then(exit)
// selectUsers()
