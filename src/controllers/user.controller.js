import bcrypt from "bcrypt"
import { signUpSchema } from "../schemas/auth.schema.js";
import { getUserByEmail, registerAddress, registerUser } from "../repositories/user.repository.js";

export async function signUp(req, res) {

    
    try {
        const { password, email } = req.body;
        const userData = req.body;

        const validationSchema = signUpSchema.validate(userData);
        
       if(validationSchema.error){
            return res.status(422).send("Todos os campos são obrigatórios")
        }
        
        const passwordHash = bcrypt.hashSync(password, 10);
        
        const userAlreadyExists = await getUserByEmail(email);
        
        if(userAlreadyExists.rows.length) {
            return res.sendStatus(409)
        }
        
        await registerUser(userData, passwordHash)
        
        const user = await getUserByEmail(email);
        
        const { id } = user.rows[0]
        const { address, city, estate} = req.body

        await registerAddress(id, address, city, estate)
        
        return res.sendStatus(202)
        
    } catch (error) {
        return res.sendStatus(500);
    }
}