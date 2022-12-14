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

// ***********************************************************************************
// Function is called after a successful signup
// ***********************************************************************************
exports.insertNewUser = async(firstName, lastName, email, password, provider, verified, verificationString) => {

    let dbStmt = 'INSERT INTO app_users (first_name, last_name, email, password, account_created_at, provider, email_verification_string, email_verified) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;'
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

// ***********************************************************************************
// Function is called when a user attempts to login with their email
// ***********************************************************************************
exports.getUserLoginCredsWithEmail = async (email) => {

    let dbStmt = 'SELECT * FROM app_users WHERE email ilike ($1);';
    let dbValues = [email];

    try {
        let loginCredentials = await pool.query(dbStmt, dbValues);
        if(!loginCredentials.rows.length) {
            return false;
        };
        return loginCredentials.rows[0];
    }
    catch(error) {
        console.log(error);
        return false;
    };
};

// ***********************************************************************************
// Function is called when a user verifies their email. ('clicked' from the link I sent in the email '/signup/email')
// ***********************************************************************************
exports.verifyUsersEmail = async (uniqueString) => {

    let dbStmt = 'UPDATE app_users SET email_verified = true, email_verification_string = null WHERE email_verification_string = ($1) RETURNING *;';
    let dbValues = [uniqueString];

    try {
        let wasUpdated = await pool.query(dbStmt, dbValues);
        return wasUpdated.rows.length > 0;
    }
    catch(err) {
        console.log(err);
        return false;
    };
};

// ***********************************************************************************
// Function will select all deadman switches user the user DB id
// ***********************************************************************************
exports.getDeadmanSwitches = async (userId) => {
    
    let dbStmt = 'SELECT * FROM deadman_switches WHERE user_id = ($1)';
    let dbValues = [userId];

    try {
        let dbQuery = await pool.query(dbStmt, dbValues);
        return [true, dbQuery.rows];
    }
    catch(err) {
        console.log(err);
        return [false];
    };
};

// ***********************************************************************************
// Function will insert a new deadman switch into the DB
// ***********************************************************************************
exports.insertNewDeadmanSwitch = async (userId, newSwitchData) => {
    
    let dbStmt = 'INSERT INTO deadman_switches (user_id, switch_name, created_at, check_in_interval_in_hours, check_in_by_timestamp, last_checked_in_at, recipient_email, recipient_first_name, recipient_last_name, final_message, triggered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;';
    let dbValues = [userId, newSwitchData.switchName, new Date(Date.now()), newSwitchData.checkInIntervalInDays * 24, new Date(newSwitchData.checkInByTime), new Date(newSwitchData.firstCheckedInAt), newSwitchData.recipientEmail, newSwitchData.recipientFirstName, newSwitchData.recipientLastName, newSwitchData.finalMessage, false];

    try {
        let dbQuery = await pool.query(dbStmt, dbValues);
        return [true, dbQuery.rows[0]];
    }
    catch(err) {
        console.log(err);
        return [false];
    };
};

// ***********************************************************************************
// Function will get users account data. Currently called only when a user selects the 'account' view
// ***********************************************************************************
exports.getUserAccountData = async (userId) => {

    let dbStmt = 'SELECT * FROM app_users WHERE id = ($1)';
    let dbValues = [userId];

    try {
        let dbQuery = await pool.query(dbStmt, dbValues);
        return [true, dbQuery.rows[0]];
    }
    catch(err) {
        console.log(err);
        return [false];
    };
};

// ******************************************************************************
// Function is called when a user check's in. Extends the check_in_by_timestamp by the interval
// ******************************************************************************
exports.checkInDeadmanSwitch = async (newCheckInByTime, switchId, userId) => {
    let dbStmt = 'UPDATE deadman_switches SET check_in_by_timestamp = ($1), last_checked_in_at = ($2) WHERE id = ($3) AND user_id = ($4) RETURNING *;'
    let dbValues = [new Date(newCheckInByTime), new Date(Date.now()), switchId, userId];
    try {
        let updatedData = await pool.query(dbStmt, dbValues);
        return [updatedData.rows.length > 0, updatedData.rows[0]];
    }
    catch(err) {
        return [false];
    };  
};

// ******************************************************************************
// Function is called on a 1 minute interval (chron job) to check for expired switches
// ******************************************************************************
exports.checkForExpiredSwitches = async () => {

    let dbStmt = 'SELECT * FROM deadman_switches WHERE triggered = false AND ($1) > check_in_by_timestamp;';
    // let dbStmt = 'SELECT check_in_by_timestamp FROM deadman_switches';
    
    let dbValues = [new Date(Date.now())];
    
    try {
        let dbQuery = await pool.query(dbStmt, dbValues);
        return [dbQuery.rows.length > 0, dbQuery.rows]
    }
    catch(error) {
        console.log(error);
        return [false];
    };
};

// ******************************************************************************
// Function is called only after a switches time has expired and the final message email has been sent
// ******************************************************************************
exports.deactivateExpiredSwitch = async(switchId, userId) => {
    
    let dbStmt = 'UPDATE deadman_switches SET triggered = ($1) WHERE id = ($2) AND user_id = ($3);';
    let dbValues = [true, switchId, userId];
    try {
        await pool.query(dbStmt, dbValues);
        console.log('Should be here in db call success')
        return true;
    }
    catch(error) {
        return false;
    };
};

exports.deleteSwitch = async(switchId) => {
    let dbStmt = 'DELETE FROM deadman_switches WHERE id = ($1);';
    let dbValues = [switchId];
    try {
        await pool.query(dbStmt, dbValues);
        return true;
    }
    catch(error) {
        console.log(error);
        return false;
    };
};

// Function NOT IN USE
exports.deleteExpiredSwitch = async(userId, switchId) => {
    let dbStmt = 'DELETE FROM deadman_switches WHERE user_id = ($1) AND id = ($2);'
    let dbValues = [userId, switchId];
    try {
        await pool.query(dbStmt, dbValues);
    }
    catch(error) {
        console.log(error);
        console.log('ERROR disabling switch after it has expired. The last email and alert email to the deadman have already been sent out.');
    };
};
