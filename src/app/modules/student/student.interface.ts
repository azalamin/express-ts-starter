export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContact: string
  motherName: string
  motherOccupation: string
  motherContact: string
}

export type Username = {
  firstName: string
  middleName?: string
  lastName: string
}

export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type Student = {
  id: string
  name: Username
  gender: 'male' | 'female' | 'other'
  dateOfBirth?: string
  email: string
  contactNo: string
  emergencyContact: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: Guardian
  localGuardian: LocalGuardian
  profileImg?: string
  isActive: 'active' | 'blocked'
}
