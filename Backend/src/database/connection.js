const knex = require('knex');
const configation = require('../../knexfile');

const config = process.env.NODE_ENV == 'test' ? configation.test : configation.development;

 const connection = knex(config);
 module.exports = connection;