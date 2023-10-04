import bcrypt from "bcrypt"
import { signUpSchema } from "../schemas/auth.schema.js";
import { getUserByEmail, registerUser } from "../repositories/user.repository.js";

export async function signUp(req, res) {

    try {
        const {name, email, password} = req.body;

        const validationSchema = signUpSchema.validate(user);

       if(validationSchema.error){
            return res.status(422).send("Todos os campos são obrigatórios")
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        const userAlreadyExists = await getUserByEmail(email);
 
        if(userAlreadyExists.rows.length) {
            return res.sendStatus(409)
        }
 
        await registerUser(name, email, passwordHash)
 
        return res.sendStatus(201)
        
    } catch (error) {
        return res.sendStatus(500);
    }
}