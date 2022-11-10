// Function returns a random string of numbers (for signup email verification)
exports.randomString = () => {
	const stringLength = 8;
	let randomString = '';
	for(let i = 0; i < stringLength; i++) {
		// Random number betweeen 1 - 10
		const randomNumber = Math.floor((Math.random() * 10) + 1);
		randomString += randomNumber;
	};
	return randomString;
};
