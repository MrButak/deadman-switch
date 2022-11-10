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

exports.insertNewUser = async(firstName, lastName, email, password, provider, verified, verificationString) => {

    let dbStmt = 'INSERT INTO app_users (first_name, last_name, email, password, creation_date, provider, verification_string, email_verified) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;'
    let dbValues = [firstName, lastName, email, password, new Date(Date.now()), provider, verificationString, verified];

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

// Function is called when a user verifies their email. ('clicked' from the link I sent in the email '/signup/email')
exports.verifyUsersEmail = async (uniqueString) => {

    let text = 'UPDATE app_users SET email_verified = true, verification_string = null WHERE verification_string = ($1) RETURNING *';
    let values = [uniqueString];

    try {
        let wasUpdated = await pool.query(text, values);
        return wasUpdated.rows.length > 0;
    }
    catch(err) {
        console.log(err);
        return false;
    };
};