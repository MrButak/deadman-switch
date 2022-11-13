import { getDeadmanSwitches } from '../javascripts/databaseManager';

// Function will get the users deadman switches from the DB
exports.getDeadmanSwitchesWithUserId = async(req, res, userId) => {

    if(!userId) {
        return res.status(500).json({status: '500', message: 'An unknown error occurred'});
    };

    let switchesQuery = await getDeadmanSwitches(userId);
    // DB error
    if(!switchesQuery) {
        return res.status(500).json({status: '500', message: 'An unknown error occurred'});
    };
    return res.status(200).json({status: '200', switchesQuery});
};

exports.createNewSwitch = async (req, res) => {


};