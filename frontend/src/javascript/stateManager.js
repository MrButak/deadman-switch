import { ref } from 'vue';
import { defineStore } from 'pinia';

const regexName = /^([A-Za-z]){1,18}$/;
const regexPassword = /^([A-Za-z0-9\-\_\!\@\#\$\%\^\&\*\+\=]){6,18}$/;
const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const useLoginSignupStore = defineStore('loginSignupStore', {
    state: () => ({
        showUserAccount: false,
        userLoggedIn: false,
        showLogin: false,
        showSignup: false,
        hasRegistered: false,
        loginFailedEmailNotVerified: false,
        userLoggedIn: false
    }),
    getters: {

    },
    actions: {
        handleLoginView() {
            // Shouldn't be showing if logged in OR the login view is already showing
            if(this.userLoggedIn || this.showLogin) { return };
             // Change views
            this.showLogin = true;
            this.showSignup = false;
        },
        handleSignupView() {
            // If already successfully registered, don't show Signup.vue Component
            if(this.hasRegistered) { return }

            // Shouldn't be showing if logged in OR the signup view is already showing
            if(this.userLoggedIn || this.showSignup) { return };
            // Change views
            this.showSignup = true;
            this.showLogin = false;
        },
        testImport() {
            const createSwitchStore = useCreateSwitchStore();
            console.log(createSwitchStore)
        }
        
    }
})

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
    actions: {

    }
});

let secondsBeforeNewSwitchFlipped = ref(0); // Not in store yet

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

export const useViewStore = defineStore('viewStore', {
    state: () => ({
        showUserAccount: false,
        showLogin: false,
        showSignup: false,
        showCreateDeadmanSwitchCreationView: false,
    }),
    actions: {
        
    },
    getters: {

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

export {
    regexName, regexPassword, regexEmail,
    secondsBeforeNewSwitchFlipped,
    formErrorMessages,

}