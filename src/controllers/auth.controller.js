import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { signInSchema } from "../schemas/auth.schema.js";
import { getUserByEmail } from "../repositories/user.repository.js";
import { registerSession } from "../repositories/auth.repository.js";

export async function signIn(req, res) {
    
    try {
        const { email, password } = req.body;
        
        const validationSchema = signInSchema.validate(req.body);

        if (validationSchema.error) {

            return res.status(422).send("Todos os campos são obrigatórios");
        }

        const userExists = await getUserByEmail(email);

        if (!userExists.rows.length) {

            return res.status(404).send("Usuário não existe!");
        }

        const passwordReceived = userExists.rows[0].password

        const isValidPassword = bcrypt.compareSync(password, passwordReceived)

        if (!isValidPassword) {
            
            return res.status(401).send("Senha inválida!");
        }

        const token = uuid();
        
        const { id } = userExists.rows[0];

        await registerSession(token, id);
        
        return res.status(200).send({ token });

    } catch (error) {
        return res.status(500).send(error);
    }


};