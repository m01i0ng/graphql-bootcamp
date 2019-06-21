export default {
  comment: {
    subscribe(parent, args, { db, pubSub }, info) {
      const { postId } = args
      const { posts } = db

      const post = posts.find(post => post.id === postId && post.published)

      if (!post) throw new Error('post not found')

      return pubSub.asyncIterator(`comment:${postId}`)
    },
  },
  post: {
    subscribe(parent, args, { db, pubSub }, info) {
      return pubSub.asyncIterator('post')
    },
  },
}
