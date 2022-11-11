import { ref } from 'vue';

let userLoggedIn = ref(false);

// Login / Signup modals
let showLogin = ref(false);
let showSignup = ref(false);
let hasRegistered = ref(false); // Determines if 'sign up success' and 'please verify your email' alerts are shown, and the 'register' modal is disabled
let loginFailedEmailNotVerified = ref(false); // Edge case. If a user registered, then in the same session logs into their account before verifying their email. This just shows another message to the user.

export {
    userLoggedIn,
    showLogin, showSignup,
    hasRegistered, loginFailedEmailNotVerified
}