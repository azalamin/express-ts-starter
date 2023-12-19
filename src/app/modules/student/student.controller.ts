/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student found successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const deleteSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.deleteSingleStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const updateSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params
    const updates = req.body

    const result = await StudentServices.updateSingleStudentFromDB(
      studentId,
      updates,
    )

    res.status(500).json({
      success: true,
      message: 'Student updated successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
  updateSingleStudent,
}
