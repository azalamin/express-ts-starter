import { z } from 'zod'

const userNameValidationSchema = z.object({
  firstName: z.string().trim().min(1).max(20),
  middleName: z.string().trim(),
  lastName: z.string().trim().min(1),
})

const guardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  fatherContact: z.string().trim(),
  fatherOccupation: z.string(),
  motherName: z.string().trim(),
  motherContact: z.string().trim(),
  motherOccupation: z.string(),
})

const localGuardianValidationSchema = z.object({
  name: z.string().trim(),
  occupation: z.string(),
  address: z.string(),
  contactNo: z.string(),
})

const studentValidationZodSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email({ message: 'Enter a valid email' }),
  contactNo: z.string(),
  emergencyContact: z.string(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    .optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
})

export default studentValidationZodSchema
