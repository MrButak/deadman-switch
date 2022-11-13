import { reactive, ref } from 'vue';

let userLoggedIn = ref(false);

// Login / Signup modals
let showLogin = ref(false);
let showSignup = ref(false);
let hasRegistered = ref(false); // Determines if 'sign up success' and 'please verify your email' alerts are shown, and the 'register' modal is disabled
let loginFailedEmailNotVerified = ref(false); // Edge case. If a user registered, then in the same session logs into their account before verifying their email. This just shows another message to the user.

let showCreateDeadmanSwitch = ref(false);

// ******************************************************************
// Create switch
// ******************************************************************
// Navigation header (HTML tabs)
let createSwitchNavigationViews = reactive(
    [
        {'text': 'Settings', 'icon': 'settings'}, 
        {'text': 'Recipient', 'icon': 'face'},
        {'text': 'Review', 'icon': 'content_paste_search'}
    ]);
let creatSwitchCurrentView = ref('Settings'); // Default

let newSwitchData = reactive({
    recipientFirstName: '',
    recipientLastName: '',
    recipientEmail: '',
    checkInIntervalInDays: 1,
    checkInTime: new Date(),
    finalMessage: ''
});

let deadmanSwitches = reactive([]);

export {
    userLoggedIn, // view (home page)
    showLogin, showSignup, // view
    hasRegistered, loginFailedEmailNotVerified, // view
    deadmanSwitches, // data
    showCreateDeadmanSwitch, // view
    // Create switch
    creatSwitchCurrentView,
    createSwitchNavigationViews, newSwitchData
}