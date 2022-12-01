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
            return false;
        case '400':
            // No query parameter in the url
            return false;
        default:
            // Even if no switches still return the empty Array
            return response.switches     
    };
};

export { getDeadmanSwitchesWithUserId }
