import Joi from 'joi';

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const eventSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    location: Joi.string(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    capacity: Joi.number().required(),
});

export { registerSchema, loginSchema, eventSchema };
