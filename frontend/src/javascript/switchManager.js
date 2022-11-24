import { checkForValidCookieAndGetUserId } from './userManager';
import { deadmanSwitches } from './stateManager';

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

// // ********************************************************************
// // Function is called when a user clicks the check in button
// // ********************************************************************
// async function handleCheckIn(switchId, checkInByTimestamp, checkInIntervalInHours) {

//     if(!isButtonLatchOpen(checkInByTimestamp, checkInIntervalInHours)) { return };
    
//     // Make sure user is logged in and get user id
//     let userId = await checkForValidCookieAndGetUserId();
//     if(!userId[0]) { return }; // not logged in
//     if(!userId[1]) { return }; // logged in, but issue with user id
    
//     // Extend the switch checkInByTime by the check in interval    
//     let newCheckInTime = new Date(new Date(checkInByTimestamp).setHours(new Date(checkInByTimestamp).getHours() + (checkInIntervalInHours)));
    
//     // Write the switches new checkInByTime to the DB
//     let request = await fetch(`${import.meta.env.VITE_BASE_URL}api/switch/checkin`, {
//         mode: 'cors',
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: JSON.stringify({
//             'deadmanSwitchId': switchId,
//             'appUserId': userId[1],
//             'newCheckInByTime': newCheckInTime
//         })
//     });

//     // Parse response
//     let response = await request.json();
//     switch(response.status) {
//         case '200':
//             // Replace the old switch with the newly updated check_in_by_time switch
//             deadmanSwitches[deadmanSwitches.findIndex(dmSwitch => dmSwitch.id == response.switch.id)] = response.switch;
//             break;
//         case '500':
//             break;
//         default:  
//     };
// };

// // ********************************************************************
// // Function will determine if a user can reset their switch.
// // ********************************************************************
// function isButtonLatchOpen(checkInByTimestamp, checkInIntervalInHours) {
//     // checkInByTime - now < interval ?
//     let secondsFromEpochToCheckInByTime = new Date(checkInByTimestamp).getTime() / 1000;
//     let secondsFromEpochToNow = new Date(Date.now()).getTime() / 1000;
//     let isButtonOpen = (secondsFromEpochToCheckInByTime - secondsFromEpochToNow) < (checkInIntervalInHours * 60 * 60);
//     return secondsBeforeSwitchExpires(checkInByTimestamp) <= 0 ?
//         false :
//         isButtonOpen;
// };

export { secondsBeforeSwitchExpires, getDeadmanSwitchesWithUserId }
