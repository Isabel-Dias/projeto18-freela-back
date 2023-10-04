import { getSession, getUserById } from '../repositories/auth.repository.js';

async function AuthSession (req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ","");

    if(!token){
        return res.sendStatus(401);
    }
    
    try {
        
        const sessionExists = await getSession(token)

        if(!sessionExists.rows.length){
            return res.sendStatus(401);
        }
        
        const { user_id } = sessionExists.rows[0];
        
        const userExists = await getUserById(user_id);

        if(!userExists.rows.length){
            return res.sendStatus(401);
        }
        
        res.locals.user = user_id;
        
        next();

    } catch (error) {
        return res.sendStatus(500)
    }
}

export {AuthSession}; 