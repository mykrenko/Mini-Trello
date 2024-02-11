import { makeExecutableSchema, addMocksToSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server';

const typeDefs = `
  type Card {
    id: ID!
    title: String!
    description: String
    column: String!
  }

  type Query {
    cards(column: String): [Card]
  }

  type Mutation {
    addCard(title: String!, description: String, column: String!): Card
    updateCard(id: ID!, title: String, description: String, column: String): Card
    deleteCard(id: ID!): ID
  }
`;

const schema = makeExecutableSchema({ typeDefs });

const mocks = {
  Query: () => ({
    cards: () => [...], // Implement mock logic here
  }),
  Mutation: () => ({
    addCard: (_, { title, description, column }) => ({ id: "1", title, description, column }),
    // Implement other mutations
  }),
};

const schemaWithMocks = addMocksToSchema({ schema, mocks });

const server = new ApolloServer({ schema: schemaWithMocks });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
