export default {
  author(parent, args, { db }, info) {
    let { users, posts, comments } = db
    return users.find(user => user.id === parent.author)
  },
  post(parent, args, { db }, info) {
    let { users, posts, comments } = db
    return posts.find(post => post.id === parent.post)
  },
}
