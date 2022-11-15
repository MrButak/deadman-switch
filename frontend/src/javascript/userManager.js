// ***********************************************************************************
// Function is called on app mount. Will check if a user is logged in granting/blocking access to 'views'
// ***********************************************************************************
async function checkForValidCookieAndGetUserId() {

    let request = await fetch(`${import.meta.env.VITE_BASE_URL}api/user/verify`, {
        method: 'GET',
        mode: 'cors',
        // credentials: 'include' // production only
    });

    let response = await request.json();
    // 400 401 200
    if(response.status == '200') {
        return [true, response.userId];
    }
    // return [false];
    return [true, 1]; // development only
};

export { checkForValidCookieAndGetUserId }
