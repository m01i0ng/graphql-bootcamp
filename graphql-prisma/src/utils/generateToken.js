import jwt from 'jsonwebtoken'

export default userId => jwt.sign(payload, 'thisisasecret', { expiresIn: '7 days' })
