/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const planets = require('./planets.json');
const characters = require('./characters.json');

exports.seed = async function(knex) {
  await knex('planets').insert(planets);
  await knex('characters').insert(characters);
};
