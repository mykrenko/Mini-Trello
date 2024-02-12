const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const fs = require("fs");
const path = require("path");
const typeDefs = fs.readFileSync(path.join(__dirname, "../../schema.graphql"), {
  encoding: "utf-8",
});

const resolvers = {
  Query: {
    cards: () => [
      // Mock data; adjust as necessary for your application
      {
        id: "1",
        title: "Learn GraphQL",
        description: "Read the official GraphQL docs.",
        column: "TODO",
      },
      {
        id: "2",
        title: "Setup Mock Server",
        description: "Implement a mock server for testing.",
        column: "IN_PROGRESS",
      },
    ],
  },
  Mutation: {
    addCard: (_, { title, description, column }) => {
      // Simplified mock implementation; in a real app, you would generate an ID and store the card
      return { id: Date.now().toString(), title, description, column };
    },
    updateCard: (_, { id, title, description, column }) => {
      // Mock update logic
      return { id, title, description, column }; // In a real scenario, find and update the card by id
    },
    deleteCard: (_, { id }) => {
      // Mock delete logic
      return id; // In a real scenario, delete the card by id and return the id
    },
  },
};

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at: ${url}`);
}

startServer().catch((error) => {
  console.error("Failed to start the server", error);
});
