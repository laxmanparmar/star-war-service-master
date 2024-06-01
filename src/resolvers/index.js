const { getMutationResolvers } = require('./mutation');
const { getQueryResolvers } = require('./query');
const { getDistinctIds } = require('../utils/validation');
const { getPlanetByCode } = require('../repository/planet');
const { getFriendsTotalCount, getFriendsById } = require('../repository/friends');
const { getMatchingCharacters, getCharacterByPlanetCode } = require('../repository/character');

const getResolvers = () => {
  return {
    Query: getQueryResolvers(),
    Mutation: getMutationResolvers(),
    Planet: {
      async characters(parent, { limit }) {
        const characters = await getCharacterByPlanetCode(parent.code, limit);
        return characters;
      }
    },
    Character: {
      async planet(parent) {
        const planet = await getPlanetByCode(parent.planet);
        return planet;
      },
      async friendsCount(parent) {
        const result = await getFriendsTotalCount(parent.id);
        return result ? result.total : 0;
      },
      async friends(parent, { limit }) {
        const friends = await getFriendsById(parent.id, limit);

        const distinctIds = getDistinctIds(friends).filter((id) => id !== parent.id);
        const characters = await getMatchingCharacters(distinctIds);
        return characters;
      }
    }
  };
};

module.exports = {
    getResolvers
};
