const { getDeadmanSwitches } = require('../javascripts/databaseManager');

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

   



    

};