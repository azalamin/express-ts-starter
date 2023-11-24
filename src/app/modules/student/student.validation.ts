import Joi from 'joi'

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .pattern(new RegExp(/^[A-Z][a-z]*$/))
    .message('{VALUE} is not in capitalized format'),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(new RegExp(/^[A-Za-z]+$/))
    .message('{VALUE} is not valid'),
})

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required(),
  fatherContact: Joi.string().trim().required(),
  fatherOccupation: Joi.string().required(),
  motherName: Joi.string().trim().required(),
  motherContact: Joi.string().trim().required(),
  motherOccupation: Joi.string().required(),
})

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  occupation: Joi.string().required(),
  address: Joi.string().required(),
})

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': '{VALUE} is not supported',
  }),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContact: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'O+',
    'O-',
    'AB+',
    'AB-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
})

export default studentValidationSchema
