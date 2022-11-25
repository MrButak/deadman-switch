import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';

const regexName = /^([A-Za-z]){1,18}$/;
const regexPassword = /^([A-Za-z0-9\-\_\!\@\#\$\%\^\&\*\+\=]){6,18}$/;
const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// ******************************************************************
// Login, Signup, Logged in  Views
// ******************************************************************
export const useLoginSignupStore = defineStore('counter', {
    state: () => ({
        userLoggedIn: false,
        showLogin: false,
        showSignup: false,
        hasRegistered: false,
        loginFailedEmailNotVerified: false
    }),
})

let userLoggedIn = ref(false);

// Login / Signup modals
let showLogin = ref(false);
let showSignup = ref(false);
let hasRegistered = ref(false); // Determines if 'sign up success' and 'please verify your email' alerts are shown, and the 'register' modal is disabled
let loginFailedEmailNotVerified = ref(false); // Edge case. If a user registered, then in the same session logs into their account before verifying their email. This just shows another message to the user.

// ******************************************************************
// Create switch
// ******************************************************************

export const useCreateSwitchStore = defineStore('createSwitchStore', {
    state: () => ({
        showCreateDeadmanSwitchCreationView: false,
        createSwitchNavigationViews: [
            {'text': 'Settings', 'icon': 'settings'}, 
            {'text': 'Recipient', 'icon': 'face'},
            {'text': 'Review', 'icon': 'content_paste_search'}
        ],
        creatSwitchCurrentView: 'Settings',
        newSwitchData: {
            recipientFirstName: '',
            recipientLastName: '',
            recipientEmail: '',
            checkInIntervalInDays: 1,
            checkInByTime: new Date(),
            finalMessage: '',
            firstCheckedInAt: null,
            switchName: 'switch name',
            // new switch form validation helpers
            acknowledgeTimeUntilFirstCheckIn: false
        },
        createSwitchReviewErrorMessages: []
        
    }),
});

let showCreateDeadmanSwitchCreationView = ref(false);

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
    checkInByTime: new Date(),
    finalMessage: '',
    firstCheckedInAt: null,
    switchName: 'switch name',
    // new switch form validation helpers
    acknowledgeTimeUntilFirstCheckIn: false
});

let createSwitchReviewErrorMessages = reactive([]);


let secondsBeforeNewSwitchFlipped = ref(0); // Not in store yet

// ******************************************************************
// User account
// ******************************************************************
let showUserAccount = ref(false);




export const useDeadmanSwitchStore = defineStore('deadmanSwitchStore', {
    state: () => ({
        deadmanSwitches: [],
        showSwitchInfoModal: false,
        showFinalMessageModal: false,
        currentlyViewedSwitch: {}
    }),
    actions: {
        assignCurrentlyViewedSwitch(dmSwitch) {
            Object.assign(this.currentlyViewedSwitch, dmSwitch);
        },
        handleShowSwitchInfoModal() {
            this.showSwitchInfoModal = !this.showSwitchInfoModal;
        },
        afterSuccessfulCheckInAssignNewVariablesToSwitch(switchIndex, newCheckInByTime, newLastCheckedInAt) {
            this.deadmanSwitches[switchIndex].check_in_by_time = newCheckInByTime;
            this.deadmanSwitches[switchIndex].last_checked_in_at = newLastCheckedInAt;
        }
    }
});


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
};

// let deadmanSwitches = reactive([]);

// When a user clicks on the 'info' icon on the deadman switch
// Switch info modal
// let showSwitchInfoModal = ref(false); // prop
// let showFinalMessageModal = ref(false); // prop
// let currentlyViewedSwitch = reactive({}); // This data will populate the switch info modal


export {
    regexName, regexPassword, regexEmail,
    userLoggedIn, // view (home page)
    showLogin, showSignup, // view
    hasRegistered, loginFailedEmailNotVerified, // view
    // deadmanSwitches, // data
    showCreateDeadmanSwitchCreationView, // view
    // Create switch
    creatSwitchCurrentView,
    createSwitchNavigationViews, 
    newSwitchData, createSwitchReviewErrorMessages,
    secondsBeforeNewSwitchFlipped,
    formErrorMessages, // global data
    // user account
    showUserAccount,
    // Switch info modal
    // showFinalMessageModal, showSwitchInfoModal, currentlyViewedSwitch
}