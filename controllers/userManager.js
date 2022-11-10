const { validateName, validateEmail, validatePassword } = require('./javascripts/validationManager');
const { insertNewUser } = require('./javascripts/databaseManager');

exports.signupEmail = async (req, res) => {

    let firstName = lastName = email = password = '';

    try {
        let userSignupData = Object.keys(req.body)
        userSignupData = JSON.parse(userSignupData);
        firstName = userSignupData.firstName;
        lastName = userSignupData.lastName;
        email = userSignupData.email;
        password = userSignupData.password;
    }
    catch(error) {
        console.log(error);
        return res.status(400);
    };

    // User input validation
    if( !validateName(firstName) || !validateName(lastName) ||
        !validateEmail(email) || !validatePassword(password) ) {
            
        return res.status(400);
    };

    // Insert user into DB
    let userData = await insertNewUser(firstName, lastName, email, password, 'email', false);
    if(!userData) {
        return res.status(400);
    };

    console.log(userData);
    
    // Send verification email
    return res.status(200)
};
