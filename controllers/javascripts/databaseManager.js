const { Pool } = require('pg');
config = require('dotenv').config();

// Db connection
let pool = new Pool({});
if(process.env.APP_ENVIRONMENT === 'development') {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: false
    });
}   
else if(process.env.APP_ENVIRONMENT === 'production') {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            required: true,
            rejectUnauthorized: false
        }
    });
};

exports.insertNewUser = async(firstName, lastName, email, password, provider, verified) => {

    let dbStmt = 'INSERT INTO app_users (first_name, last_name, email, password, creation_date, provider, email_verified) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;'
    let dbValues = [firstName, lastName, email, password, new Date(Date.now()), provider, verified];

    try {
        let userData = await pool.query(dbStmt, dbValues);
        if(userData.rows.length) {
            return userData.rows[0];
        };
        return false
    }
    catch(error) {
        console.log(error);
        return false
    };
};