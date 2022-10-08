const mysql = require("mysql2/promise");
import { insertUserSql } from "./sql";

const connectionPool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 5,
    connectTimeout: 5000
});


const insertUser = async (user) => {
    try {
        const [results, fields] = await connectionPool.query(insertUserSql,
            [
                user.id,
                user.email,
                user.name,
                user.accessToken,
                user.refreshToken,
                user.accessToken,
                user.refreshToken
            ]);
        console.log(results);
    } catch (error) {
        throw new Error(error.message);
    }

}

export {
    insertUser
}