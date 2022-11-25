import { checkForValidCookieAndGetUserId } from './userManager';
// import { deadmanSwitches } from './stateManager';

// ********************************************************************
// Function calculates the seconds before the user needs to check in
// ********************************************************************
function secondsBeforeSwitchExpires(checkInByTimestamp) {

    // Calculate seconds until switch Expires
    let secondsUntilSwitchFlipped =
        ( (new Date(checkInByTimestamp).getTime() / 1000 ) - ( new Date(Date.now()) ) / 1000 );

    // Countdown timer can't take a negative number
    if(secondsUntilSwitchFlipped < 0) { return 0 };

    return secondsUntilSwitchFlipped;    
};

// ********************************************************************
// Function is called on App load after it is verified that the user is logged in
// ********************************************************************
async function getDeadmanSwitchesWithUserId(userId) {
    
    let creds = () => { 
        return import.meta.env.VITE_APP_ENVIRONMENT == 'development' ? 'omit' : 'include'
    };

    let request = await fetch(`${import.meta.env.VITE_BASE_URL}api/user/data/deadman-switches/${userId}`, {
        method: 'GET',
        mode: 'cors',
        credentials: creds()
    });

    let response = await request.json();

    switch(response.status) {
        case '500':
            // TODO: return error message (db error on backend)
            return false;
        case '400':
            // No query parameter in the url
            return false;
        default:
            // Even if no switches still return the empty Array
            return response.switches     
    };
};

export { secondsBeforeSwitchExpires, getDeadmanSwitchesWithUserId }
