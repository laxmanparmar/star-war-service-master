const db = require('../db');
const PLANET_SCHEMA = 'planets';

const getPlanetByCode = (code) => {
    return db(PLANET_SCHEMA).where({ code }).first();
};

const getPlanetsTotal = () => {
    return db(PLANET_SCHEMA).count('* as total');
};

const getPlanets = (offset, pageSize) => {
    return db(PLANET_SCHEMA).offset(offset).limit(pageSize);
};

const addNewPlanet = (planet) => {
    return db(PLANET_SCHEMA).insert([planet]).returning('*');
};

module.exports = {
    getPlanetByCode,
    getPlanetsTotal,
    getPlanets,
    addNewPlanet
};
