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

function fetchEach (collection) {
  const Bluebird = require('bluebird')
  const list = []
  collection.each(item => {
    // and convert to JSON right away
    list.push(item.fetch().then(b => b.toJSON()))
  })
  return Bluebird.all(list)
}

function selectUsers () {
  return User.fetchAll()
  .then(fetchEach)
  .then(console.log, console.error)
}

// addUser().then(exit)
selectUsers().then(exit)
