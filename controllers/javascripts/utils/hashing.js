const bcrypt = require('bcryptjs');

// ***********************************************************************************
// Function hashes a string
// ***********************************************************************************
exports.hashString = (stringToBeHashed) => {

	return(bcrypt.hashSync(stringToBeHashed, 10));   
};

// ***********************************************************************************
// Function compares string to hashed string from DB
// ***********************************************************************************
exports.compareString = (originalString, hashedString) => {

	// Will return a boolean value
	return(bcrypt.compareSync(originalString, hashedString));
};
