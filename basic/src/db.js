const users = [
  {
    id: '1',
    name: 'admin',
    email: 'admin@a.com',
    age: 18,
  },
  {
    id: '2',
    name: 'guest',
    email: 'guest@a.com',
    age: 18,
  },
  {
    id: '3',
    name: 'demo',
    email: 'demo@a.com',
    age: 18,
  },
]

const posts = [
  {
    id: '10',
    title: 'test1',
    body: 'test1',
    published: true,
    author: '1',
  },
  {
    id: '11',
    title: 'test2',
    body: 'test2',
    published: false,
    author: '1',
  },
  {
    id: '12',
    title: 'test3',
    body: 'test3',
    published: true,
    author: '1',
  },
]

const comments = [
  {
    id: '4',
    text: 'comment4',
    author: '1',
    post: '12',
  },
  {
    id: '5',
    text: 'comment5',
    author: '1',
    post: '12',
  },
  {
    id: '6',
    text: 'comment6',
    author: '1',
    post: '11',
  },
  {
    id: '7',
    text: 'comment7',
    author: '1',
    post: '12',
  },
]

export default {
  users,
  posts,
  comments,
}
