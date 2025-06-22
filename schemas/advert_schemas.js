import Joi from "joi";

export const advertSchema = Joi.object({

     title: Joi.string()
    .min(2)
    .max(50) 
    .required()
    .messages({
      'string.empty': 'Title cannot be empty.',
      'any.required': 'Title is required.',
    }),

  description: Joi.string()
    .min(5) 
    .max(100) 
    .required()
    .messages({
      'string.empty': 'Description cannot be empty.',
      'any.required': 'Description is required.',
    }),

  price: Joi.number()
    .min(0) 
    .required()
    .messages({
      'number.empty': 'Price cannot be empty.',
      'any.required': 'Price is required.'
    }),

  category: Joi.string()
    .min(2) 
    .max(15) 
    .required()
    .messages({
    
      'string.empty': 'Category cannot be empty.',
      'any.required': 'Category is required.'
    }),

  images: Joi.array(),
    
  vendor: Joi.string() 
})