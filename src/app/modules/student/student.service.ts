import { Student } from './student.model'

const getAllStudentsFromDB = async () => {
  const result = await Student.find()

  return result
}
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id })
  const result = await Student.aggregate([{ $match: { id: id } }])
  return result
}

const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true })

  return result
}

const updateSingleStudentFromDB = async (id: string, updates: object) => {
  const result = await Student.updateOne({ id }, { $set: updates })

  return result
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateSingleStudentFromDB,
}
