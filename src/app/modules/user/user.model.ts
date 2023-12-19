import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../config'
import { TUser } from './user.interface'

const userSchema = new Schema<TUser>({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  needsPasswordChange: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ['admin', 'student', 'faculty'],
    required: true,
  },
  status: {
    type: String,
    enum: ['in-progress', 'blocked'],
    required: true,
    default: 'in-progress',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

export const User = model('User', userSchema)
