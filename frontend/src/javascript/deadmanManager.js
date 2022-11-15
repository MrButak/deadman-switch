async function getDeadmanSwitchesWithUserId(userId) {
    console.log({userId})
    let request = await fetch(`${import.meta.env.VITE_BASE_URL}api/user/data/deadman-switches/${userId}`, {
        method: 'GET',
    });

    let response = await request.json();
    console.log(response)
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

export { getDeadmanSwitchesWithUserId }