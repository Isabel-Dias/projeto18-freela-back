import db from "../database/database.connection.js";

export async function getUserByEmail(email) {

    const user = await db.query(
        `SELECT * 
        FROM users 
        WHERE email = $1`, [email]
    )

    return user;
}

export async function getUserByPhone(phone) {

    const user = await db.query(
        `SELECT * 
        FROM users 
        WHERE phone_number = $1`, [phone]
    )

    return user;
}

export async function registerAddress(id, city, state) {
    
    await db.query(
        `INSERT INTO addresses
        (user_id, city, state)
        VALUES
        ($1, $2, $3)`,
        [id, city, state]
    )
}

export async function registerUser(userData, passwordHash) {
    
    const { name, email, birthday, phoneNumber} = userData

    await db.query(
        `INSERT INTO users
        (name, email, password, birthday, 
        phone_number)
        VALUES
        ($1, $2, $3, $4, $5)`, 
        [name, email, passwordHash, birthday,
        phoneNumber] 
    )

}