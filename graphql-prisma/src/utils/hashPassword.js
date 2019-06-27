import bcrypt from 'bcryptjs'

export default async password => {
  if (password.length < 8) throw new Error('password must be 8 or longer')

  return bcrypt.hash(password, 10)
}
