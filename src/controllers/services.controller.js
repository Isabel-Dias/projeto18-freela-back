import { getAllServices, registerNewService } from "../repositories/services.repository.js"
import newServiceSchema from "../schemas/services.schema.js"

export async function getServices(req, res) {
    const bearerToken = req.headers.authorization
    const token = bearerToken.replace('Bearer ', '')

    try {

        const { user_id } = res.locals.user

        const allServices = await getAllServices(user_id)
        return res.status(201).send(allServices.rows)

    } catch (error) {
        return res.status(500).send(error)
    }
}

export async function registerService(req, res) {
    const { user } = res.locals
    const serviceData = req.body
    
    const validationSchema = newServiceSchema.validate(req.body);
        
    if(validationSchema.error){
    
        return res.status(422).send("Informações em formato inválido")
    }

    try {
        
        registerNewService(serviceData, user);

        return res.status(202).send("Serviço cadastrado com sucesso")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}