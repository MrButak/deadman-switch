exports.signupEmail = async (req, res) => {

    let firstName = lastName = email = password = '';

    try {
        let userSignupData = Object.keys(req.body)
        userSignupData = JSON.parse(userSignupData);
        firstName = userSignupData.firstName;
        lastName = userSignupData.lastName;
        email = userSignupData.email;
        password = userSignupData.password;
    }
    catch(error) {
        console.log(error);
        return res.status(400);
    };

    // // Must have
    // if(!firstName || !lastName || !email || !password) {
    //     return res.status(400);
    // }

    console.log(firstName)
    console.log(lastName)
    console.log(email)
    console.log(password)
    
    
    
    return res.status(200)
};