/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body

    // data validation using zod
    // const zodParseData = studentValidationZodSchema.parse(studentData)

    const result = await UserServices.createStudentIntoDB(password, studentData)

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully!',
      data: result,
    })
  } catch (err: any) {
    next(err)
  }
}

export const UserControllers = {
  createStudent,
}
