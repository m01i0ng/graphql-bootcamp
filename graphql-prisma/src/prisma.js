import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: 'thisismysupersecrettext',
})

export default prisma

// prisma.exists
//   .Comment({
//     id: 'cjxa1ys2v00p709222u9e4n8h',
//     text: 'hahahcomment',
//     author: {
//       id: 'cjxa1w7am00nf09226xywgo6c',
//     },
//   })
//   .then(exist => {
//     console.log(exist)
//   })

// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({
//     id: authorId,
//   })

//   if (!userExists) throw new Error('user not found')

//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId,
//           },
//         },
//       },
//     },
//     '{ author { id name email posts { id title published } } }',
//   )

//   return post.author
// }

// createPostForUser('cjxa1w7am00nf09226xywgo6c', {
//   title: 'second',
//   body: 'hahahdfjkahsd',
//   published: true,
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2))
//   })
//   .catch(err => {
//     console.log(err.message)
//   })

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({
//     id: postId,
//   })

//   if (!postExists) throw new Error('post not found')

//   const post = await prisma.mutation.updatePost(
//     {
//       where: {
//         id: postId,
//       },
//       data,
//     },
//     '{ author { id name email posts { id title published } } }',
//   )

//   return post.author
// }

// updatePostForUser('cjxa5ju0j017e09222md9l4qa', { published: false })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2))
//   })
//   .catch(err => {
//     console.log(err.message)
//   })
