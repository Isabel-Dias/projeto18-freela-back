import JoiBase from "joi";
import JoiDate from "@joi/date";

const joi = JoiBase.extend(JoiDate);


const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    birthday: joi.date().format('DD/MM/YYYY').greater('01/01/1900').required(),
    phoneNumber: joi.string().regex(/^[0-9]{9}$/).required(),
    city: joi.string().required(),
    state: joi.string().required()
})

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

export {signInSchema, signUpSchema}

