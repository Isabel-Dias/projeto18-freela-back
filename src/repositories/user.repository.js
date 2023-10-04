import db from "../database/database.connection.js";

export async function getUserByEmail(email) {

    const user = await db.query(
        `SELECT * 
        FROM users 
        WHERE email = $1`, [email]
    )
    
    return user;
}

export async function registerUser(name, email, passwordHash) {
    
    await db.query(
        `INSERT INTO users
        (name, email, password)
        VALUES
        ($1, $2, $3)`, [name, email, passwordHash]
    )

}