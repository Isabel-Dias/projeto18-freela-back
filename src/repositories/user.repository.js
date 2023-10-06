import db from "../database/database.connection.js";

export async function getUserByEmail(email) {

    const user = await db.query(
        `SELECT * 
        FROM users 
        WHERE email = $1`, [email]
    )
    
    return user;
}

export async function registerUser(userData, passwordHash) {
    
    const { name, email, birthday, phoneNumber, address, city, estate } = userData

    //procurar lookup table e transformar os endereços em ids pra enviar

    await db.query(
        `INSERT INTO users
        (name, email, password, birthday, 
        phone_number, address_id, city_id, estate_id)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)`, 
        [name, email, passwordHash, birthday, 
        phoneNumber ] // completar com as infos relevantes
    )

}