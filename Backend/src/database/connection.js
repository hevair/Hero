const knex = require('knex');
const configation = require('../../knexfile');

 const connection = knex(configation.development);
 module.exports = connection;