/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { UserServices } from './user.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body

    // data validation using zod
    // const zodParseData = studentValidationZodSchema.parse(studentData)

    const result = await UserServices.createStudentIntoDB(password, studentData)

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

export const UserControllers = {
  createStudent,
}
