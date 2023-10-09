import joi from "joi";

const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    birthday: joi.date().required(),
    phoneNumber: joi.string().regex(/^[0-9]{10}$/).required(),
    address: joi.string().required(),
    city: joi.string().required(),
    estate: joi.string().required()
})

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

export {signInSchema, signUpSchema}

