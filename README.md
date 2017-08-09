# bookshelf-json-example

> Example of DB with JSON object inside a column

This example shows how to put an entire JSON object into a single `jsonb`
column in a relational database

## Dependencies

We are going to need the following dependencies

* [sqlite3][sqlite3] is the actual lightweight database. We could have used
  other databases, like Postgres if we wanted to
* [knex][knex] converts logical functions into SQL queries
* [bookshelf][bookshelf] is an ORM on top of database to hide SQL
* [bookshelf-json-columns][bookshelf-json-columns] automatically parses the
  JSON column from the database into objects

[sqlite3]: https://github.com/mapbox/node-sqlite3
[knex]: http://knexjs.org/
[bookshelf]: http://bookshelfjs.org/
[bookshelf-json-columns]: http://seegno.github.io/bookshelf-json-columns/

## Connection

See how we make a connection to the database in [connection.js](connection.js),
[database.js](database.js) and [knexfile.js](knexfile.js)

## Making a table

To create a table in our database, we need our first migration. I placed
commands into scripts in [package.json](package.json) which call to
[Knex migrations](http://knexjs.org/#Migrations)

```bash
$ npm run migrate:make -- users

> bookshelf-json-example@1.0.0 migrate:make /git/bookshelf-json-example
> knex migrate:make "users"

Using environment: development
Created Migration: /git/bookshelf-json-example/migrations/20170809124258_users.js
```

It is a good idea to upgrade database before running, thus I call
`migrate:latest` before start script runs.

```json
{
  "scripts": {
    "prestart": "npm run migrate:latest",
    "start": "node index.js",
    "migrate:make": "knex migrate:make",
    "migrate:latest": "knex migrate:latest"
  }
}
```

For now the migration is empty. Let us create a table to store user
information: name, email and some meta object. The `meta` column should use
[jsonb](http://knexjs.org/#Schema-jsonb) format for efficiency.

```js
// migrations/20170809124258_users.js
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
```

Let us run the migration from command line
