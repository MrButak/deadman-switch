async function checkForValidCookie() {

    let request = await fetch(`${import.meta.env.VITE_BASE_URL}api/user/verify`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
    });

    appUserData = await request.json();
};

export { checkForValidCookie }