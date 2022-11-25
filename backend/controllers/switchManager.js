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
    if(switchesQuery[1].length) {
        switchesQuery[1].forEach((dmSwitch) => {
            dmSwitch.recipient_first_name = decryptString(dmSwitch.recipient_first_name);
            dmSwitch.recipient_last_name = decryptString(dmSwitch.recipient_last_name);
            dmSwitch.recipient_email = decryptString(dmSwitch.recipient_email);
            dmSwitch.final_message = decryptString(dmSwitch.final_message);
            dmSwitch.switch_name = decryptString(dmSwitch.switch_name);
        });
    };
    

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

    // Encrypt before inserting into DB
    newSwitchData.recipientFirstName = encryptString(newSwitchData.recipientFirstName);
    newSwitchData.recipientLastName = encryptString(newSwitchData.recipientLastName);
    newSwitchData.recipientEmail = encryptString(newSwitchData.recipientEmail);
    newSwitchData.finalMessage = encryptString(newSwitchData.finalMessage);
    newSwitchData.switchName = encryptString(newSwitchData.switchName);

    let switchData = await insertNewDeadmanSwitch(userId, newSwitchData);
    if(!switchData[0]) {
        return res.status(500).json({status: '500', message: 'An unknown database error occurred'}); 
    };

    // Decrypt before sending back to the frontend
    switchData[1].recipient_first_name = decryptString(switchData[1].recipient_first_name);
    switchData[1].recipient_last_name = decryptString(switchData[1].recipient_last_name);
    switchData[1].recipient_email = decryptString(switchData[1].recipient_email);
    switchData[1].final_message = decryptString(switchData[1].final_message);
    switchData[1].switch_name = decryptString(switchData[1].switch_name);

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

    // Decrypt
    return res.status(200).json({status: '200', message: 'Check in successful', 
        switch: {
            id: updatedSwitch[1].id,
            check_in_by_time: updatedSwitch[1].check_in_by_time,
            last_checked_in_at: updatedSwitch[1].last_checked_in_at
        }
    });
};
