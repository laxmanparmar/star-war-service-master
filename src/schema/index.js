const { gql } = require('apollo-server-koa');

const typeDefs = gql`
  type CharacterModel {
    id: Int
    name: String
    description: String
    pictureUrl: String
  }

  type PlanetModel {
    id: Int
    name: String
    description: String
    code: String
    pictureUrl: String
  }

  type Planet {
    id: Int
    name: String
    description: String
    code: String
    pictureUrl: String
    characters(limit: Int): [Character]
  }

  type PlanetResponse {
    total: Int
    page: Int
    pageSize: Int
    nodes: [Planet]
  }

  type Character {
    id: Int
    name: String
    description: String
    pictureUrl: String
    planet: PlanetModel
    friendsCount: Int
    friends(limit: Int): [CharacterModel]
  }

  type CharactersResponse {
    total: Int
    page: Int
    pageSize: Int
    nodes: [Character]
  }

  type Query {
    planets(page: Int, pageSize: Int): PlanetResponse
    characters(page: Int, pageSize: Int): CharactersResponse
    character(id: Int!): Character
  }

  input PlanetPayload {
    name: String!
    description: String!
    code: String!
    pictureUrl: String!
  }

  input CharacterPayload {
    name: String!
    description: String!
    pictureUrl: String!
    planet: String!
    friends: [Int]
  }
  type Response {
    success: Boolean!
    message: String!
  }

  type Mutation {
    createPlanet(planetInfo: PlanetPayload!): PlanetModel!
    createCharacter(characterInfo: CharacterPayload!): CharacterModel!
  }
`;

module.exports = { typeDefs };
