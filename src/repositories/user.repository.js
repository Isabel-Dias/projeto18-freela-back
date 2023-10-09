import db from "../database/database.connection.js";

export async function getUserByEmail(email) {

    const user = await db.query(
        `SELECT * 
        FROM users 
        WHERE email = $1`, [email]
    )

    return user;
}

export async function registerAddress(id, address, city, estate) {
    console.log("bastard");
    await db.query(
        `INSERT INTO addresses
        (user_id, address, city, estate)
        VALUES
        ($1, $2, $3, $4)`,
        [id, address, city, estate]
    )
}


export async function registerUser(userData, passwordHash) {
    console.log(userData);
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