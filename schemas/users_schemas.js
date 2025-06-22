import Joi from "joi";

export const usersignupSchema = Joi.object({

 firstName: Joi.string()
    
    .min(2)
    .max(15)
    .required()
    .messages({
      'string.empty': 'Please tell us your first name.',
      'any.required': 'First name is required.',
    }),

  lastName: Joi.string()
    .min(2)
    .max(15)
    .required()
    .messages({
      'string.empty': 'Please tell us your last name.',
      'any.required': 'Last name is required.',
    }),

  
  email: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please enter your email address.',
      'any.required': 'Email is required.',
    }),

  password: Joi.string()
    .min(3) 
    .max(16)
    .required()
    .messages({
      'string.empty': 'Please create a password.',
      'any.required': 'Password is required.',
    }),

  confirmPassword: Joi.string()
    .required()
    .messages({
      'any.required': 'Please confirm your password.',
      'any.only': 'Your passwords do not match. Please type them again carefully.', 
    }),

  
  role: Joi.string()
    .valid('vendor', 'user') 
    .messages({
      'string.empty': 'Role cannot be empty if provided.',
      'any.only': 'Role must be either "vendor" or "user".',
    }),

});

export const userloginSchema = Joi.object({
 email: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please enter your email address.',
      'any.required': 'Email is required for login.',
    }),

  password: Joi.string()
    .required() 
    .messages({
      'string.empty': 'Please enter your password.',
      'any.required': 'Password is required for login.',
    }),

})