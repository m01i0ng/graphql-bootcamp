import { GraphQLServer, PubSub } from 'graphql-yoga'

import db from './db'
import Query from './resolvers/query'
import Mutation from './resolvers/mutation'
import Subscription from './resolvers/subscription'
import User from './resolvers/user'
import Post from './resolvers/post'
import Comment from './resolvers/comment'
import prisma from './prisma'

const pubSub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
  },
  context(request) {
    return {
      db,
      pubSub,
      prisma,
      request,
    }
  },
})

server.start(() => {
  console.log('the server is up')
})
