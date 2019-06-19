import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`

const resolvers = {
  Query: {
    id: () => 'abs',
    name: () => 'alley',
    age: () => 18,
    employed: () => true,
    gpa: () => 3.14,
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => {
  console.log('the server is up')
})
