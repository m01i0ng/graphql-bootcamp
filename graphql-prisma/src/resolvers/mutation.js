import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import getUserId from '../utils/getUserId'

export default {
  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length < 8) throw new Error('password must be 8 or longer')

    const password = await bcrypt.hash(args.data.password, 10)
    const user = prisma.mutation.createUser(
      {
        data: {
          ...args.data,
          password,
        },
      },
      null,
    )

    return {
      user,
      token: jwt.sign({ userId: user.id }, 'thisisasecret'),
    }
  },
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email,
      },
    })

    if (!user) throw new Error('login error')

    const isMatch = await bcrypt.compare(args.data.password, user.password)

    if (!isMatch) throw new Error('login error')

    return {
      user,
      token: jwt.sign({ userId: user.id }, 'thisisasecret'),
    }
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId,
        },
      },
      info,
    )
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.mutation.updateUser(
      {
        where: {
          id: userId,
        },
        data: args.data,
      },
      info,
    )
  },
  async createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info,
    )
  },
  async updatePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const postExists = await prisma.query.Post({
      id: args.id,
      author: {
        id: userId,
      },
    })

    const isPublished = await prisma.exists.Post({
      id: args.id,
      published: true,
    })

    if (!postExists) throw new Error('unable to update post')
    if (isPublished && args.data.published === false) {
      await prisma.mutation.deleteManyComments({
        where: {
          post: {
            id: args.id,
          },
        },
      })
    }

    return prisma.mutation.updatePost(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info,
    )
  },
  async deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId,
      },
    })

    if (!postExists) throw new Error('unable to delete post')

    return prisma.mutation.deletePost(
      {
        where: {
          id: args.id,
        },
      },
      info,
    )
  },
  async createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({
      id: args.data.post,
      published: true,
    })

    if (!postExists) throw new Error('post not found')

    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: userId,
            },
          },
          post: {
            connect: {
              id: args.data.post,
            },
          },
        },
      },
      info,
    )
  },
  async deleteComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const commentExists = await prisma.query.Comment({
      id: args.id,
      author: {
        id: userId,
      },
    })

    if (!commentExists) throw new Error('unable to delete comment')

    return prisma.mutation.deleteComment(
      {
        where: {
          id: args.id,
        },
      },
      info,
    )
  },
  async updateComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const commentExists = await prisma.query.Comment({
      id: args.id,
      author: {
        id: userId,
      },
    })

    if (!commentExists) throw new Error('unable to update comment')

    return prisma.mutation.updateComment(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info,
    )
  },
}
