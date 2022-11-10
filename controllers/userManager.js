const { validateName, validateEmail, validatePassword } = require('./javascripts/validationManager');
const { insertNewUser, verifyUsersEmail, getUserLoginCredsWithEmail } = require('./javascripts/databaseManager');
const { hashString, compareString } = require('./javascripts/utils/hashing');
const { randomString } = require('./javascripts/utils/utils');
const { sendVerificationEmail } = require('./javascripts/emailManager');
const { createJwtTokenWithDbId, verifyToken, refreshToken } = require('./javascripts/jwtManager');

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
        return res.status(400).json({status: '400', message: 'Invalid credentials'});
    };

    // User input validation
    if( !validateName(firstName) || !validateName(lastName) ||
        !validateEmail(email) || !validatePassword(password) ) {
            
        return res.status(400).json({status: '400', message: 'Invalid credentials'});;
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
        return res.status(400).json({status: '400', message: 'Invalid credentials'});
    };

    // Send verification email
    sendVerificationEmail(userData.firstName, userData.lastName, userData.email, userData.verification_string);
    

    return res.status(200).json({status: '200'});
};

// Function will handle user login and issue a cookie upon success
exports.loginEmail = async (req, res) => {
    
    let email = password = '';

    try {
        let userLoginData = Object.keys(req.body)
        userLoginData = JSON.parse(userLoginData);
        email = userLoginData.email;
        password = userLoginData.password;
    }
    catch(error) {
        console.log(error);
        return res.status(400).json({status: '400', message: 'Invalid credentials'});
    };

    // User input validation
    if( !validateEmail(email) || !validatePassword(password) ) {  
        return res.status(400).json({status: '400', message: 'Invalid credentials'});
    };

    // Get user login credentials from DB
    let userLoginDbData = await getUserLoginCredsWithEmail(email);
    if(!userLoginDbData) {
        return res.status(400).json({status: '400', message: 'Invalid credentials'});
    };

    // Check to see if passwords match
    let passwordsMatch = compareString(password, userLoginDbData.password);
    if(!passwordsMatch) {
        return res.status(400).json({status: '400', message: 'Invalid credentials'});
    };

    // Make sure they have a verified email
    if(!userLoginDbData.email_verified) {
        // The HyperText Transfer Protocol (HTTP) 401 Unauthorized response status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource
        return res.status(401).json({status: '401', message: 'Email not verified'});
    };

    // Issue a JWT as a cookie
    let accessToken = createJwtTokenWithDbId(userLoginDbData.id);
    
	res.cookie('dms_access_token', accessToken, {
        secure: true,
		signed: true, // signed with 'cookie-parser' middleware
        sameSite: true,
		httpOnly: true,
		expires: new Date(Date.now() + 3600 * 24 * 14 * 1000) // 14 days. Set to same age as JWT
	});

    // Login success
    return res.status(200).json({status: '200', message: 'Login Success!'});
};


// Function is called when a user 'clicks' on the email verification link (only when signed up with email)
exports.verifyUserEmail = async (req, res) => {
    
	let uniqueString = '';
	// console.log(req._startTime) _startTime: 2022-08-21T00:29:30.774Z . I could put a verification_string_created timestampz in db and compare to req._startTime
	
	try {
		uniqueString = req.params.uniqueString;
	}
	catch(err) {
		console.log(err);
        return res.send('Link invalid');
	};
	
	// If no query string was in request
	if(!uniqueString) {
		return res.send('Link invalid');
	};

    // Update user in DB. If success, their account is now verified.
    let userVerified = await verifyUsersEmail(uniqueString);
    
	if(!userVerified) {
		return res.send('Link invalid');
	};

    // Email verification success
	return res.send('Verification success! You can safely close this window now.');
};
