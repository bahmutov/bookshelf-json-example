// uses JSONB column "meta"
// http://knexjs.org/#Schema-jsonb
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('email').unique();
      table.string('name');
      table.jsonb('meta')
      table.timestamps();
    })
  ]);
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
