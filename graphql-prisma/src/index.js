import { GraphQLServer, PubSub } from 'graphql-yoga'

import prisma from './prisma'
import { resolvers, fragmentReplacements } from './resolvers/index'

const pubSub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      pubSub,
      prisma,
      request,
    }
  },
  fragmentReplacements,
})

server.start({ port: process.env.PORT }, () => {
  console.log(`the server is listening on localhost:${process.env.PORT}`)
})
