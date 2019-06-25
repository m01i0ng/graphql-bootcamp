export default {
  comment: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.comment(
        {
          where: {
            node: {
              post: {
                id: args.postId,
              },
            },
          },
        },
        info,
      )
    },
  },
  post: {
    subscribe(parent, args, { prisma }, info) {
      // return pubSub.asyncIterator('post')
      return prisma.subscription.post(
        {
          where: {
            node: {
              published: true,
            },
          },
        },
        info,
      )
    },
  },
}
