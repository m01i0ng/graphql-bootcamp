import getUserId from '../utils/getUserId'

export default {
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { prisma }, info) {
      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id,
          },
        },
      })
    },
  },
  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false)

      return userId && userId === parent.id ? parent.email : ''
    },
  },
}
