const { getDeadmanSwitches, insertNewDeadmanSwitch } = require('../javascripts/databaseManager');
const { validateName, validateEmail } = require('../javascripts/validationManager');

// Function will get the users deadman switches from the DB
exports.getDeadmanSwitchesWithUserId = async(req, res) => {

    let userId = '';
	
	try {
        console.log(req.params)
		userId = req.params.userId;
	}
	catch(err) {
		console.log(err);
        return res.status(500).json({status: '500', message: 'An unknown error occurred'});
	};

    if(!userId) {
        return res.status(400).json({status: '400', message: 'Invalid user id'});
    };

    let switchesQuery = await getDeadmanSwitches(userId);
    // DB error
    if(!switchesQuery[0]) {
        return res.status(500).json({status: '500', message: 'An unknown error occurred'});
    };
    return res.status(200).json({status: '200', switches: switchesQuery[1]});
};

exports.createNewSwitch = async (req, res) => {
    // recipientFirstName: '',
    // recipientLastName: '',
    // recipientEmail: '',
    // checkInIntervalInDays: 1,
    // checkInTime: new Date(),
    // finalMessage: ''
    let newSwitchData = '';
    let userId = '';
    
    try {
        let bodyData = Object.keys(req.body)
        newSwitchData = JSON.parse(bodyData.newSwitchData);
        userId = JSON.parse(bodyData.userId);
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({status: '500', message: 'Unknown error'});
    };
    
    // Falsy data from req.body
    if(!newSwitchData || !userId) {
        return res.status(500).json({status: '500', message: 'Unknown error'});
    };

    // User input validation
    if(!validateName(newSwitchData.recipientFirstName) ||
        !validateName(newSwitchData.recipientLastName) ||
        !validateEmail(newSwitchData.recipientEmail) ||
        newSwitchData.checkInIntervalInDays < 0 ||
        newSwitchData.checkInIntervalInDays > 3 ||
        new Date(newSwitchData.checkInTime).getTime() < 0 ||
        !newSwitchData.finalMessage)
            { 
                return res.status(400).json({status: '400', message: 'Invalid switch settings'}); 
            };

    // ****** From this point switch is good to put into db *******

    let switchData = await insertNewDeadmanSwitch(userId, newSwitchData);
    if(!switchData[0]) {
        return res.status(500).json({status: '500', message: 'An unknown database error occurred'}); 
    };

    console.log(switchData[1]);

    // console.log(newSwitchData)
    // console.log(userId)
};