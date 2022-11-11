// ***********************************************************************************
// Function is called on app mount. Will check if a user is logged in granting/blocking access to 'views'
// ***********************************************************************************
async function checkForValidCookie() {

    let request = await fetch(`${import.meta.env.VITE_BASE_URL}api/user/verify`, {
        method: 'GET',
        mode: 'cors',
        // credentials: 'include'
    });

    let response = await request.json();
    // 400 401 200
    if(response.status == '200') {
        return true;
    }
    // return false;
    return true;
};

export { checkForValidCookie }
