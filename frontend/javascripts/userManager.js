// ***********************************************************************************
// Function is called on app mount. Will check if a user is logged in granting/blocking access to 'views'
// ***********************************************************************************
async function checkForValidCookieAndGetUserId() {

    let request = await fetch(`${import.meta.env.VITE_BASE_URL}api/user/verify`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
    });

    let response = await request.json();
    // 400 401 200
    if(response.status == '200') {
        return [true, response.userDbId];
    }
    return [false];
    // return [true, response.userDbId];
};


async function getDeadmanSwitchesWithUserId(userId) {

    let request = await fetch(`${import.meta.env.VITE_BASE_URL}api/user/data/deadman-switches/?${userId}`, {
        method: 'GET',
    });

    let response = await request.json();
    console.log(response)
    switch(response.status) {
        case '500':
            // TODO: return error message (db error on backend)
            break;
        default:
            // Even if no switches still return the empty Array
            
    }
};
export { checkForValidCookieAndGetUserId, getDeadmanSwitchesWithUserId }
