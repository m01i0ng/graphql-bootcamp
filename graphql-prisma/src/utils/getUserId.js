import jwt from 'jsonwebtoken'

export default request => {
  const header = request.request.headers.authorization

  if (!header) throw new Error('auth required')

  const token = header.replace('Bearer ', '')
  const decoded = jwt.verify(token, 'thisisasecret')

  return decoded.userId
}
