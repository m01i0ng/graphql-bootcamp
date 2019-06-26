import { extractFragmentReplacements } from 'prisma-binding'

import Query from './query'
import Mutation from './mutation'
import Subscription from './subscription'
import User from './user'
import Post from './post'
import Comment from './comment'

export const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment,
}

export const fragmentReplacements = extractFragmentReplacements(resolvers)
