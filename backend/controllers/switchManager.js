const { getDeadmanSwitches, insertNewDeadmanSwitch, checkInDeadmanSwitch } = require('../javascripts/databaseManager');
const { validateName, validateEmail } = require('../javascripts/validationManager');
const { encryptString, decryptString } = require('../javascripts/utils/utils');

// ******************************************************************************
// // Function will get the users deadman switches from the DB
// ******************************************************************************
exports.getDeadmanSwitchesWithUserId = async(req, res) => {
    let userId = '';
	
	try {
		userId = req.params.userId;
	}
	catch(err) {
		console.log(err);
        return res.status(500).json({status: '500', message: 'An unknown error occurred'});
	};

    // Falsy data from req.body
    if(!userId) {
        return res.status(400).json({status: '400', message: 'Invalid user id'});
    };

    let switchesQuery = await getDeadmanSwitches(userId);

    // DB error
    if(!switchesQuery[0]) {
        return res.status(500).json({status: '500', message: 'An unknown error occurred'});
    };

    // Decrypt
    // id: 3,
    // user_id: 1,
    // switch_name: 'switch name',
    // created_at: 2022-11-20T14:43:41.375Z,
    // check_in_interval_in_hours: 24,
    // check_in_by_time: 2022-11-22T14:47:40.769Z,
    // last_checked_in_at: 2022-11-20T14:50:16.873Z,
    // recipient_email: 'ssdsd@dsfsd.com',
    // recipient_first_name: 'dfgfd',
    // recipient_last_name: 'Buggs',
    // final_message: "Hi ma, I won't be making it home for supper tonight. You know what to do.",     
    // triggered: false
    switchesQuery[1].forEach((dmSwitch) => {
        dmSwitch.recipient_first_name = decryptString(dmSwitch.recipient_first_name);
        dmSwitch.recipient_last_name = decryptString(dmSwitch.recipient_last_name);
        dmSwitch.recipient_email = decryptString(dmSwitch.recipient_email);
        dmSwitch.final_message = decryptString(dmSwitch.final_message);
    });

    // Even if no switches, return an empty array
    return res.status(200).json({status: '200', switches: switchesQuery[1]});
};

// ******************************************************************************
// Function will create a new switch and insert it into the DB
// ******************************************************************************
exports.createNewSwitch = async (req, res) => {
    let newSwitchData = '';
    let userId = '';
    
    try {
        let bodyData = JSON.parse(Object.keys(req.body));
        newSwitchData = bodyData.newSwitchData;
        userId = bodyData.userId;
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
        new Date(newSwitchData.checkInByTime).getTime() < 0 ||
        !newSwitchData.finalMessage)
            { 
                return res.status(400).json({status: '400', message: 'Invalid switch settings'}); 
            };
    
    // TODO: make sure the switch is not < 3 minutes before expiring
    
    
    // ****** From this point switch is good to put into db *******

    // Encrypt
    newSwitchData.recipientFirstName = await encryptString(newSwitchData.recipientFirstName);
    newSwitchData.recipientLastName = await encryptString(newSwitchData.recipientLastName);
    newSwitchData.recipientEmail = await encryptString(newSwitchData.recipientEmail);
    newSwitchData.finalMessage = await encryptString(newSwitchData.finalMessage);
    newSwitchData.switchName = await encryptString(newSwitchData.switchName);

    let switchData = await insertNewDeadmanSwitch(userId, newSwitchData);
    if(!switchData[0]) {
        return res.status(500).json({status: '500', message: 'An unknown database error occurred'}); 
    };
    // console.log({switchData})
    return res.status(200).json({status: '200', message: 'Switch successfully created', switch: switchData[1]});
};

// ******************************************************************************
// Function is called when a user checks in. Extend the switches check_in_by_time by the interval
// ******************************************************************************
exports.checkIn = async (req, res) => {
    let switchId = '';
    let userId = '';
    let newCheckInByTime = '';

    try {
        let bodyData = JSON.parse(Object.keys(req.body));
        console.log(bodyData)
        switchId = bodyData.deadmanSwitchId;
        userId = bodyData.appUserId;
        newCheckInByTime = bodyData.newCheckInByTime;
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({status: '500', message: 'Unknown error'});
    };
    
    // Falsy data from req.body
    if(!switchId || !userId || !newCheckInByTime) {
        return res.status(500).json({status: '500', message: 'Unknown error'});
    };

    let updatedSwitch = await checkInDeadmanSwitch(newCheckInByTime, switchId, userId);
    if(!updatedSwitch[0]) {
        return res.status(500).json({status: '500', message: 'Unknown database error'});
    };
    return res.status(200).json({status: '200', message: 'Switch was successfully reset', switch: updatedSwitch[1]});
};
