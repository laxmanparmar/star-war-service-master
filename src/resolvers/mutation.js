const db = require('../db');
const { addNewCharacter, getCharacterById } = require('../repository/character');
const { addFriend } = require('../repository/friends');
const { addNewPlanet, getPlanetByCode } = require('../repository/planet');
const { validatPayload } = require('../utils/validation');

const getMutationResolvers = () => {
  return {
    createPlanet: async (_, _args, _context) => {
      try {
        validatPayload(_args.planetInfo);
        const result = await addNewPlanet(_args.planetInfo);
        return result[0];
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    createCharacter: async (_, _args, _context) => {
      try {
        validatPayload(_args.characterInfo);
        const { friends = [], ...character } = _args.characterInfo;
        const isPlanetExists = await getPlanetByCode(character.planet);
        if (!isPlanetExists) {
          throw new Error(`Planet with this code ${character.planet} doesn't exists`);
        }
        const [result] = await addNewCharacter(character);

        const friendsMap = await Promise.all(friends.map(async (fId) => {
          const isCharacterExists = await getCharacterById(fId);
          if(!isCharacterExists) {
            throw new Error(`Character with this id ${fId} doesn't exists`);
          }
          return {
            character_id: result.id,
            friend_id: fId
          }
        }));

        if(friendsMap.length) {
          await addFriend(friendsMap);
        }
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };
};

module.exports = {
    getMutationResolvers
};
