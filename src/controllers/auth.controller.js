import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { signInSchema } from "../schemas/auth.schema.js";
import { getUser } from "../repositories/user.repository.js";
import { registerSession } from "../repositories/auth.repository.js";

export async function signIn(req, res) {
    
    try {
        const { email, password } = req.body;

        const validationSchema = signInSchema.validate(req.body);

        if (validationSchema.error) {

            return res.status(422).send("Todos os campos são obrigatórios");
        }

        const userExists = await getUser(email);

        if (!userExists.rows.length) {

            return res.sendStatus(404).send("Usuário não existe!");
        }

        const userPassword = userExists.rows[0].password

        const isValidPassword = bcrypt.compareSync(password, userPassword)

        if (!isValidPassword) {
            
            return res.sendStatus(401).send("Senha inválida!");
        }

        const token = uuid();
        
        const { id } = userExists.rows[0];

        await registerSession(token, id);

        return res.status(200).send({ token });

    } catch (error) {
        return res.sendStatus(500);
    }


};