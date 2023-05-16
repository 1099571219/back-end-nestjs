import * as crypto from 'crypto'

export const makeSalt = () => {
  return crypto.randomBytes(3).toString('base64')
}

export const encryptPassword = (password: string, salt: string) => {
  if (!password || !salt) {
    return ''
  }
  const tempSalt = Buffer.from(salt, 'base64')
  return crypto
    .pbkdf2Sync(password, tempSalt, 10000, 16, 'hsa1')
    .toString('base64')
}
