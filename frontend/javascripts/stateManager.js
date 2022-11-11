import { ref } from 'vue';

// Login / Signup modals
let userLoggedIn = ref(false);
let showLogin = ref(false);
let showSignup = ref(false);
let hasRegistered = ref(false); // Determines if 'sign up success' and 'please verify your email' alerts are shown, and the 'register' modal is disabled
let loginFailedEmailNotVerified = ref(false);

export {
    userLoggedIn,
    showLogin, showSignup,
    hasRegistered, loginFailedEmailNotVerified
}