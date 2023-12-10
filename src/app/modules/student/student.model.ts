import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import validator from 'validator'
import config from '../../config'
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUsername,
} from './student.interface'

const userNameSchema = new Schema<TUsername>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name required'],
    maxlength: [20, 'Max length is 20'],
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()

        return firstNameStr === value
      },
      message: '{VALUE} is not capitalize format',
    },
  },
  middleName: {
    type: String,
    trim: true, // remove extra space
  },
  lastName: {
    type: String,
    required: [true, 'Last name required'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
    trim: true,
  },
  fatherContact: {
    type: String,
    required: true,
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
    trim: true,
  },
  motherContact: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
})

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: [true, 'Password is required'],
    unique: true,
    maxlength: [20, 'Password cannot be more than 20 characters'],
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not supported',
    },
    required: [true, 'gender is required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not a valid email',
    // },
  },
  contactNo: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: {
    type: String,
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })

  return existingUser
}

// pre save middleware / hook - we will save data
studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

// post save middleware / hook - we saved data
studentSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

// pre find quarry middleware / hook
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

// creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const exitingUser = await Student.findOne({ id })

//   return exitingUser
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
