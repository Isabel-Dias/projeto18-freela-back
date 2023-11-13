import bcrypt from "bcrypt"
import { signUpSchema } from "../schemas/auth.schema.js";
import { getUserByEmail, getUserByPhone, registerAddress, registerUser } from "../repositories/user.repository.js";

export async function signUp(req, res) {

    
    try {
        const { password, email, phoneNumber } = req.body;
        const userData = req.body;

        const validationSchema = signUpSchema.validate(userData);
        
       if(validationSchema.error){
            return res.status(422).send("Todos os campos são obrigatórios")
        }
        
        const passwordHash = bcrypt.hashSync(password, 10);
        
        const userAlreadyExists = await getUserByEmail(email);
        
        if(userAlreadyExists.rows.length) {
            return res.status(409).send("Uma conta com este email já existe")
        }

        const numberInUse = await getUserByPhone(phoneNumber)

        if(numberInUse.rowCount != 0) {
            return res.status(409).send("Uma conta com este número de telefone já existe")
        }
        
        await registerUser(userData, passwordHash)
        
        const user = await getUserByEmail(email);
        
        const { id } = user.rows[0]
        const { city, state } = req.body

        await registerAddress(id, city, state)
        
        return res.sendStatus(202)
        
    } catch (error) {
        return res.status(500).send(error);
    }
}