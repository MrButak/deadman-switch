exports.validateName = (name) => {

    let regexName = /^([A-Za-z]){1,18}$/;
    return regexName.test(name);
};

exports.validateEmail = (email) => {

    let regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return regexEmail.test(email);
};

exports.validatePassword = (password) => {

    let regexPassword = /^([A-Za-z0-9\-\_\!\@\#\$\%\^\&\*\+\=]){6,18}$/;
    return regexPassword.test(password);
};
