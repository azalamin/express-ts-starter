import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import studentValidationZodSchema from './student.zod.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using zod

    // Data validation using Joi
    // const { error, value } = studentValidationSchema.validate(studentData)
    const { student: studentData } = req.body

    // data validation using zod
    const zodParseData = studentValidationZodSchema.parse(studentData)

    const result = await StudentServices.createStudentIntoDB(zodParseData)

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     data: error.details,
    //   })
    // }

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    })
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student found successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    })
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
