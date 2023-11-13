import { getSession, getUserById } from '../repositories/auth.repository.js';

async function AuthSession (req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ","");

    if(!token){
        return res.status(401).send("Acesso não autorizado");
    }
    
    try {
        
        const sessionExists = await getSession(token)

        if(!sessionExists.rows.length){
            return res.status(401).send("Sessão inexistente, acesso não autorizado");
        }
        
        const { user_id } = sessionExists.rows[0];
        
        const userExists = await getUserById(user_id);

        if(!userExists.rows.length){
            return res.status(401).send("Sessão inexistente, acesso não autorizado");
        }
        
        res.locals.user = user_id;
        
        next();

    } catch (error) {
        return res.sendStatus(500)
    }
}

export {AuthSession}; 