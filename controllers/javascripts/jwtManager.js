const jwt = require("jsonwebtoken");
const config = process.env;

// Create token
exports.createJwtTokenWithDbId = (userDbId) => {

	// Create a new token with the user_id (from db) in the payload
	const token = jwt.sign({ userDbId }, process.env.JWT_KEY, {
		algorithm: "HS256",
		expiresIn: 3600 * 24 * 14 // 14 days (in seconds)
	});

	return token;
};

exports.verifyToken = (tc_access_token) => {

	const token = tc_access_token;

	let payload;
	try {
		// Parse the JWT string and store the result in `payload`.
		// This method will throw an error if the token is invalid, or if it has expired according to the expiry time set on signing, or if the signature does not match
		payload = jwt.verify(token, process.env.JWT_KEY)
	} 
	catch (err) {
		if (err instanceof jwt.JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
			// TODO: log user out and set existing browser cookie maxAge : 0 (this will destroy cookie)
			return {status : '401'};
		};
		// otherwise, return a bad request error
		return {status : '400'};
		// TODO: log user out and set existing browser cookie maxAge : 0 (this will destroy cookie)
	};

	return payload;
};

exports.refreshToken = (res, payload) => {

   
	// Ensure that a new token is not issued until enough time has elapsed
	// In this case, a new token will only be issued if the old token is within
	// 2 days of expiry. Otherwise, return a bad request status
	const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
	if (payload.exp - nowUnixSeconds > 172800) { // 2 days

		// Token/Cookie does not need refreshing
		return; // {status : 400};
	};


	// Get the user id from token. This will save a db call.
	let userDbId = payload.userDbId;
	
	// Now, create a new token for the current user, with a renewed expiration time
	const newToken = jwt.sign({ userDbId }, process.env.JWT_KEY, {
		algorithm: "HS256",
		expiresIn: 3600 * 24 * 14 // 14 days (in seconds)
	});

	
	// Set the new token as the users cookie (should overwrite the previous one, since from the name, path and domain)
	res.cookie('tc_access_token', newToken, {
		secure: true, // set to true in production
		signed: true, // signed with 'cookie-parser' middleware
		sameSite: true,
		expires: new Date(Date.now() + 3600 * 24 * 14 * 1000) // 14 days. Set to same age as JWT (in milliseconds)
	});
}