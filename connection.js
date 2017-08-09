var knex = require('knex')(
  require(__dirname + '/knexfile')[process.env.NODE_ENV || 'development']
)
module.exports = knex
