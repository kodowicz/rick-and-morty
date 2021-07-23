const typeDefs = `
  input FavCharacterCreateInput {
    image: String
    id: ID
    name: String
    gender: String
    status: String
    species: String
    favorite: Boolean
    lastEpisode: String
  }

  type Episode {
    episode: String
  }

  type FavCharacter {
    image: String!
    id: ID!
    name: String!
    gender: String!
    status: String!
    species: String!
    favorite: Boolean!
    lastEpisode: String!
    episode: Episode
  }

  type Query {
    favCharacters: [FavCharacter]
    characters: [Character]
  }

  type Mutation {
    createFavCharacter(data: FavCharacterCreateInput!): FavCharacter
    deleteFavCharacter(id: ID!): FavCharacter
  }
`;

export default typeDefs;
