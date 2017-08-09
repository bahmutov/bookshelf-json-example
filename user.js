var Bookshelf = require('./database')

// require('./favorite');
// require('./subscriber');

var User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
}, {
  jsonColumns: ['meta']
})

module.exports = Bookshelf.model('User', User)
