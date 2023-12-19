import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {}
  // set generated user id manually
  userData.id = '2030100001'
  // if user password is not given, use default password
  userData.password = password || config.default_password
  // set role
  userData.role = 'student'

  const newUser = await User.create(userData)

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id
    studentData.user = newUser._id

    const result = Student.create(studentData)
    return result
  }
}

export const UserServices = {
  createStudentIntoDB,
}
