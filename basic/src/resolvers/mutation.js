import uuidV4 from 'uuid/v4'

export default {
  createUser(parent, args, { db }, info) {
    let { users } = db
    const { email } = args.data
    const emailTaken = users.some(user => user.email === email)

    if (emailTaken) throw new Error('email taken')

    const user = {
      id: uuidV4(),
      ...args.data,
    }

    users.push(user)

    return user
  },
  deleteUser(parent, args, { db }, info) {
    let { users, posts, comments } = db
    const { id } = args
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) throw new Error('user not found')

    const deletedUsers = users.splice(userIndex, 1)

    posts = posts.filter(post => {
      const match = post.author === id

      if (match) {
        comments = comments.filter(comment => comment.post !== post.id)
      }

      return !match
    })

    comments = comments.filter(comment => comment.author !== id)

    return deletedUsers[0]
  },
  updateUser(parent, args, { db }, info) {
    let { users } = db
    const { id, data } = args

    const user = users.find(user => user.id === id)

    if (!user) throw new Error('user not found')

    if (typeof data.email === 'string') {
      const emailTaken = users.some(user => user.email === data.email)

      if (emailTaken) throw new Error('email taken')

      user.email = data.email
    }

    if (typeof data.name === 'string') user.name = data.name

    if (typeof data.age !== 'undefined') user.age = data.age

    return user
  },
  createPost(parent, args, { db, pubSub }, info) {
    let { users, posts } = db
    const { author } = args.data
    const userExists = users.some(user => user.id === author)

    if (!userExists) throw new Error('user not found')

    const post = {
      id: uuidV4(),
      ...args.data,
    }

    posts.push(post)

    if (post.published) {
      pubSub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post,
        },
      })
    }

    return post
  },
  updatePost(parent, args, { db, pubSub }, info) {
    let { posts } = db
    const { id, data } = args

    const post = posts.find(post => post.id === id)
    const originalPost = { ...post }

    if (!post) throw new Error('post nox found')

    if (typeof data.title === 'string') post.title = data.title
    if (typeof data.body === 'string') post.body = data.body
    if (typeof data.published === 'boolean') {
      post.published = data.published

      if (originalPost.published === true && !post.published) {
        // deleted
        pubSub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: originalPost,
          },
        })
      } else if (!originalPost.published && post.published) {
        // created
        pubSub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post,
          },
        })
      }
    } else if (post.published) {
      // updated
      pubSub.publish('post', {
        post: {
          mutation: 'UPDATED',
          data: post,
        },
      })
    }

    return post
  },
  deletePost(parent, args, { db, pubSub }, info) {
    let { posts, comments } = db
    const { id } = args
    const postIndex = posts.findIndex(post => post.id === id)

    if (postIndex === -1) throw new Error('post not exists')

    const [post] = posts.splice(postIndex, 1)

    comments = comments.filter(comment => comment.post !== id)

    if (post.published) {
      pubSub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: post,
        },
      })
    }

    return post
  },
  createComment(parent, args, { db, pubSub }, info) {
    let { users, posts, comments } = db
    const { data } = args

    const userExists = users.some(user => user.id === data.author)
    const postExists = posts.some(post => post.id === data.post && post.published)

    if (!userExists) throw new Error('user not exists')
    if (!postExists) throw new Error('post not exists')

    const comment = {
      id: uuidV4(),
      ...args.data,
    }

    comments.push(comment)
    pubSub.publish(`comment:${data.post}`, {
      comment: {
        mutation: 'CREATED',
        data: comment,
      },
    })

    return comment
  },
  deleteComment(parent, args, { db, pubSub }, info) {
    let { comments } = db
    const { id } = args
    const commentIndex = comments.findIndex(comment => comment.id === id)

    if (commentIndex === -1) throw new Error('comment not exists')

    const [comment] = comments.splice(commentIndex, 1)

    pubSub.publish(`comment:${comment.post}`, {
      comment: {
        mutation: 'DELETED',
        data: comment,
      },
    })

    return comment
  },
  updateComment(parent, args, { db, pubSub }, info) {
    let { comments } = db
    const { id, data } = args

    const comment = comments.find(comment => comment.id === id)

    if (!comment) throw new Error('comment not found')

    if (typeof data.text === 'string') comment.text = data.text

    pubSub.publish(`comment:${data.post}`, {
      comment: {
        mutation: 'UPDATED',
        data: comment,
      },
    })

    return comment
  },
}
