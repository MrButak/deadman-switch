config = require('dotenv').config();
let CryptoJS = require("crypto-js");


// ***********************************************************************************
// Function returns a random string of numbers (for signup email verification)
// ***********************************************************************************
exports.randomString = () => {
	const stringLength = 8;``
	let randomString = '';
	for(let i = 0; i < stringLength; i++) {
		// Random number betweeen 1 - 10
		const randomNumber = Math.floor((Math.random() * 10) + 1);
		randomString += randomNumber;
	};
	return randomString;
};

// ***********************************************************************************
// Function decodes a url/cookie e.g.: 'a%20ee%2F%2F%20sa%2F%20fgI33%20%2F' => 'a ee// sa/ fgI33 /'
// ***********************************************************************************
exports.decodeUri = (encoded) => {
	return decodeURIComponent(encoded.replace(/\+/g,  " "));
};

// ***********************************************************************************
// Function encodes a url/cookie e.g.: 'a ee// sa/ fgI33 /' => 'a%20ee%2F%2F%20sa%2F%20fgI33%20%2F'
// ***********************************************************************************
exports.encodeUri = (decoded) => {
	return encodeURIComponent(decoded).replace(/'/g,"%27").replace(/"/g,"%22");	
};

exports.encryptString = (stringToEncrypt) => {
    return CryptoJS.AES.encrypt(stringToEncrypt, process.env.CRYPTO_JS_KEY).toString();
};

exports.decryptString = (encryptedStringToDecrypt) => {
    let bytes = CryptoJS.AES.decrypt(encryptedStringToDecrypt, process.env.CRYPTO_JS_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};
