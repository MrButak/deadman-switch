// Function will get the users deadman switches from the DB
exports.getDeadmanSwitchesWithUserId = async(req, res, userId) => {

    if(!userId) {
        return res.status(200).json({status: '500', message: 'An unknown error occurred'});
    };

    let userData = await getUserDeadmanSwitches();
};

exports.createNewSwitch = async (req,res) => {


};