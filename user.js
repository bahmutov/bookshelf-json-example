const Bookshelf = require('./database')
const User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
}, {
  jsonColumns: ['meta']
})
module.exports = Bookshelf.model('User', User)
