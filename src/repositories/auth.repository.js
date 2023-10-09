import db from "../database/database.connection.js";

export async function registerSession(token, id) {
    
    await db.query(
        `INSERT INTO sessions
        (token, user_id)
        VALUES ($1, $2)`, [token, id]
    );
}

export async function getSession(token) {
    
    const session = await db.query(
        `SELECT * 
        FROM sessions
        WHERE token = $1`, [token]
    );
    
    return session;
}

export async function getUserById(user_id) {
    
    const userIdExists = await db.query(
        `SELECT * 
        FROM users
        WHERE id = $1` , [user_id]
    )

    return userIdExists;
}