const PLANET_CODE_REGEX = /[A-Z]{2}-[A-Z]{3}-[0-9]{2}$/;

const validatPayload = ({
    name,
    code,
    description,
    planet
}) => {
    if (name.length > 20) {
        throw new Error('Name must be less than 20 characters');
    }
    if(description.length > 300 || description.length < 15) {
        throw new Error('Description must be less than 300 and more then 15 characters');
    }
    const data = code || planet;
    if(!PLANET_CODE_REGEX.test(data)) {
        throw new Error('Code must be in correct format');
    }
}

const getDistinctIds = (friends) => {
    const characterIds = friends.reduce((acc, curr) => {
        return [
          ...acc,
          curr.character_id,
          curr.friend_id
        ]
      }, []);
      return [...new Set(characterIds)];
}
module.exports = {
    validatPayload,
    getDistinctIds
}
