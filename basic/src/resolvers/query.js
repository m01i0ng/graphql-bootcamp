export default {
  users(parent, args, { db }, info) {
    let { users } = db
    if (!args.query) {
      return users
    }

    return users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
  },
  posts(parent, args, { db }, info) {
    let { posts } = db
    if (!args.query) {
      return posts
    }

    return posts.filter(post => post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase()))
  },
  comments(parent, args, { db }, info) {
    let { comments } = db
    return comments
  },
  me() {
    return {
      id: '1234',
      name: 'admin',
      email: 'a@b.com',
      age: 18,
    }
  },
  post() {
    return {
      id: 'testId',
      title: 'title',
      body: 'body',
      published: true,
    }
  },
}
