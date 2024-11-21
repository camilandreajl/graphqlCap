import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import {resolvers} from './resolvers'
console.log('hello')

const typeDefs = readFileSync(require.resolve('./schema.graphql')).toString('utf-8')

// desarrollo del endpoint /graphql
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
const main = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main()

