import db from "../database/database.connection.js";

export async function getAllServices() {
    const allServices = await db.query(
        `SELECT
            services.id AS service_id,
            services.name AS service,
            services.price,
            services.photo,
            users.name AS provider, 
            users.phone_number AS "phoneNumber",
            addresses.city,
            addresses.state
        FROM 
            services
        JOIN 
            users ON services.user_id = users.id
        JOIN 
            addresses ON services.user_id = addresses.user_id
        WHERE 
            services.status = true;`
    )
    return allServices;
}

export async function registerNewService(service, id) {
    const {photo, serviceName, description, price} = service;
    

    await db.query(
        `INSERT INTO services
            (name, photo, description, price, user_id)
        VALUES
            ($1, $2, $3, $4, $5)`,
        [serviceName, photo, description, price, id]
    )

}

export async function getServiceById(serviceId) {
    
    const service = await db.query(
        `SELECT 
            services.name AS service,
            services.description,
            services.price,
            services.photo,
            users.name AS provider, 
            users.phone_number AS "phoneNumber",
            addresses.city,
            addresses.state
        FROM 
            services
        JOIN 
            users ON services.user_id = users.id
        JOIN 
            addresses ON services.user_id = addresses.user_id
        WHERE 
            services.id = $1`,
        [serviceId]
    )
    return service;
}