import { userLoggedIn, showLogin, showSignup } from './stateManager';

function handleLoginView() {
    
    // Shouldn't be showing if logged in OR the login view is already showing
    if(userLoggedIn.value || showLogin.value) { return };
    // Change views
    showLogin.value = true;
    showSignup.value = false;

};

function handleSignupView() {
    
    // Shouldn't be showing if logged in OR the signup view is already showing
    if(userLoggedIn.value || showSignup.value) { return };
    // Change views
    showSignup.value = true;
    showLogin.value = false;
};

export { handleLoginView, handleSignupView }