import joi from "joi"

const newServiceSchema = joi.object({
    photo: joi.string().uri().required(),
    serviceName: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required()
})

export default newServiceSchema;