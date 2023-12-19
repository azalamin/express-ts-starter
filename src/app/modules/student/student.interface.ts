import { Date, Model, Types } from 'mongoose'

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContact: string
  motherName: string
  motherOccupation: string
  motherContact: string
}

export type TName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  user: Types.ObjectId
  name: TName
  gender: 'male' | 'female' | 'other'
  dateOfBirth?: Date
  email: string
  contactNo: string
  emergencyContact: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: {
    road: string
    city: string
    country: string
  }
  permanentAddress: {
    road: string
    city: string
    country: string
  }
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImg?: string
  // academicDepartment: Types.ObjectId
  isDeleted: boolean
}

// for creating static
export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null>
}
