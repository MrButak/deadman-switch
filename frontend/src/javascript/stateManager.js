import { reactive, ref } from 'vue';

const regexName = /^([A-Za-z]){1,18}$/;
const regexPassword = /^([A-Za-z0-9\-\_\!\@\#\$\%\^\&\*\+\=]){6,18}$/;
const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

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
    finalMessage: '',
    firstCheckedInAt: null,
    switchName: 'switch name',
    // new switch form validation helpers
    acknowledgeTimeUntilFirstCheckIn: false,
    checkInForTheFirstTime: false, // checkbox - will add checkInIntervalInDays to secondsBeforeSwitchFlipped (time before user needs to check in for the first time)
});

let secondsBeforeNewSwitchFlipped = ref(0);
let createSwitchReviewErrorMessages = reactive([]);

// ******************************************************************
// User account
// ******************************************************************
let showUserAccount = ref(false);






let formErrorMessages = {
    'firstName': {
        'id': 1,
        'text': 'Invalid first name',
        'icon': 'info',
        'color': 'warning'
    },
    'lastName': {
        'id': 2,
        'text': 'Invalid last name',
        'icon': 'info',
        'color': 'warning'
    },
    'email': {
        'id': 3,
        'text': 'Invalid email',
        'icon': 'info',
        'color': 'warning'
    },
    'checkInIntervalInDays': {
        'id': 4,
        'text': 'Invalid checkin interval. Must be between 1 - 3',
        'icon': 'info',
        'color': 'warning'
    },
    'mustCreateSwitchWithTimeBuffer': {
        'id': 5,
        'text': 'Leave yourself at least 3 minutes to checkin',
        'icon': 'info',
        'color': 'warning'
    }
}

let deadmanSwitches = reactive([]);

export {
    regexName, regexPassword, regexEmail,
    userLoggedIn, // view (home page)
    showLogin, showSignup, // view
    hasRegistered, loginFailedEmailNotVerified, // view
    deadmanSwitches, // data
    showCreateDeadmanSwitch, // view
    // Create switch
    creatSwitchCurrentView,
    createSwitchNavigationViews, 
    newSwitchData, createSwitchReviewErrorMessages,
    secondsBeforeNewSwitchFlipped,
    formErrorMessages, // global data
    // user account
    showUserAccount
}