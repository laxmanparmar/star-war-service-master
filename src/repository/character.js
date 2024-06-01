const db = require('../db');
const CHARACTER_SCHEMA = 'characters';

const getMatchingCharacters = (distinctIds) => {
    return db(CHARACTER_SCHEMA).whereIn('id', distinctIds)
};

const getCharacterByPlanetCode = (code, limit) => {
    const query = db(CHARACTER_SCHEMA).where({ planet: code });
    if (limit) {
        query.limit(limit);
    }
    return query;
};

const getTotalCharacters = () => {
    return db(CHARACTER_SCHEMA).count('* as total');
};

const getCharacters = (offset, pageSize) => {
    return db(CHARACTER_SCHEMA).offset(offset).limit(pageSize);
};

const getCharacterById = (id) => {
    return db(CHARACTER_SCHEMA).where({ id }).first();
};

const addNewCharacter = (character) => {
    return db(CHARACTER_SCHEMA).insert([character]).returning('*');
};

module.exports = {
    getMatchingCharacters,
    getCharacterByPlanetCode,
    getTotalCharacters,
    getCharacters,
    getCharacterById,
    addNewCharacter
};
