import { pool } from "../database/conection.js";

const verifyCredentials = async (email, password) => {
    const query = "SELECT * FROM usuarios WHERE email = $1 AND password = $2";
    const values = [email, password];
    const { rowCount } = await pool.query(query, values);
    if (!rowCount)
        throw { code: 404, message: "No se encontro un usuario con estas credenciales"}
}

const findOneEmail = async (email) => {
    const query = "SELECT * FROM usuarios WHERE email =$1";
    const values = [email];
    const { rows } = await pool.query(query, values);
    return rows [0];
};

const create = async ({ email, password, rol, lenguage }) => {
    const query = "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [email, password, rol, lenguage];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const perfil = async (email) => {
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const values = [email];
    const { rows } = await pool.query(query, values);
    return rows[0];
};


export const users = {
    verifyCredentials,
    findOneEmail,
    create,
    perfil,
}