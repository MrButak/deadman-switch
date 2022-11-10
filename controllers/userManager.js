const { validateName, validateEmail, validatePassword } = require('./javascripts/validationManager');
const { insertNewUser } = require('./javascripts/databaseManager');
const { hashString, compareString } = require('./javascripts/utils/hashing');
const { randomString } = require('./javascripts/utils/utils');
const { sendVerificationEmail } = require('./javascripts/emailManager');

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
    let userData = await insertNewUser(
        firstName, 
        lastName, 
        email, 
        hashString(password), 
        'email', 
        false,
        randomString()
    );

    if(!userData) {
        return res.status(400);
    };

    // Send verification email
    let didSendVerificationEmail = sendVerificationEmail(userData.firstName, userData.lastName, userData.email, userData.verification_string);
    if(!didSendVerificationEmail) {
        console.log('I need to handle this event, not sure how to yet');
    };

    return res.status(200)
};

// Function is called when a user 'clicks' on the email verification link (only when signed up with email)
exports.verifyUserEmail = async (req, res) => {
    console.log('made it')
	let uniqueString = '';
	// console.log(req._startTime) _startTime: 2022-08-21T00:29:30.774Z . I could put a verification_string_created timestampz in db and compare to req._startTime
	
	try {
		uniqueString = Object.keys(req.query)[0];
	}
	catch(err) {
		console.log(err)
	};
	
	// If no query string was in request
	if(!uniqueString) {
		return res.redirect('https://mrbutak.com');
		// return res.send('Link invalid');
	};

    // TODO: check if user is already verified. If so, send another message ('Account already verified')

	// Update user in DB. If success, their account is now verified.
	// let wasVerified = await dbManager.verifyUserInDbEmail(uniqueString);
    
	// if(!wasVerified) {
	// 	// return res.redirect(process.env.APP_REDIRECT_URL);
	// 	return res.send('Link invalid');
	// };

	// console.log('success, db updated/user verified');
	return res.send('Verification success! You can safely close this window now.');
};
