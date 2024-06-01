const db = require('../db');
const { getCharacters, getTotalCharacters, getCharacterById } = require('../repository/character');
const { getFriendsTotalCount } = require('../repository/friends');
const { getPlanets, getPlanetsTotal, getPlanetByCode } = require('../repository/planet');

const getQueryResolvers = () => {
  return {
    planets: async (_, { page = 1, pageSize = 10 }, _context) => {
      try {
        const offset = (page - 1) * pageSize;
        const [count, planets] = await Promise.all([
          getPlanetsTotal(),
          getPlanets(offset, pageSize)
        ]); 
        return {
          total: count ? count[0].total : 0,
          page,
          pageSize,
          nodes: planets
        };
      } catch (error) {
        throw error;
      }
    },
    characters: async (_, { page = 1, pageSize = 10 }, _context) => {
      try {
        const offset = (page - 1) * pageSize;
        const [count, characters] = await Promise.all([
          getTotalCharacters(),
          getCharacters(offset, pageSize)
        ]);
        return {
          total: count ? count[0].total : 0,
          page,
          pageSize,
          nodes: characters
        };
      } catch (error) {
        throw error;
      }
    },
    character: async (_, { id }, _context) => {
      try {
        const character = await getCharacterById(id) || {};
        if(!character.id) {
          throw new Error(`Character with this id ${id} doesn't exists`);
        }
        const [planet, count] = await Promise.all([
          getPlanetByCode(character.planet),
          getFriendsTotalCount(character.id)
        ]);

        return {
          ...character,
          planet,
          friendsCount: count ? count.total : 0
        };
      } catch (error) {
        throw error;
      }
    }
  };
};

module.exports = {
    getQueryResolvers
};
