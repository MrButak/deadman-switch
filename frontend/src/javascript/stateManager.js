import { ref } from 'vue';
import { defineStore } from 'pinia';

const regexName = /^([A-Za-z]){1,18}$/;
const regexPassword = /^([A-Za-z0-9\-\_\!\@\#\$\%\^\&\*\+\=]){6,18}$/;
const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
let secondsBeforeNewSwitchFlipped = ref(0);

export const useLoginSignupStore = defineStore('loginSignupStore', {
    state: () => ({
        showUserAccount: false,
        userLoggedIn: false,
        showLogin: false,
        showSignup: false,
        hasRegistered: false,
        loginFailedEmailNotVerified: false
    }),
    getters: {

    },
    actions: {
        handleLoginView() {
            // Shouldn't be showing if logged in OR the login view is already showing
            if(this.userLoggedIn) { return };
             // Change views
            this.showLogin = true;
            this.showSignup = false;
        },
        handleSignupView() {
            // If already successfully registered, don't show Signup.vue Component
            if(this.hasRegistered) { return }

            // Shouldn't be showing if logged in OR the signup view is already showing
            if(this.userLoggedIn) { return };
            // Change views
            this.showSignup = true;
            this.showLogin = false;
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
            this.deadmanSwitches[switchIndex].check_in_by_timestamp = newCheckInByTime;
            this.deadmanSwitches[switchIndex].last_checked_in_at = newLastCheckedInAt;
        },
        secondsBeforeSwitchExpires(checkInByTimestamp) {
            // Calculate seconds until switch Expires
            let secondsUntilSwitchFlipped =
            ( (new Date(checkInByTimestamp).getTime() / 1000 ) - ( new Date(Date.now()) ) / 1000 );

            // Countdown timer can't take a negative number as a Prop
            if(secondsUntilSwitchFlipped < 0) { return 0 };

            return secondsUntilSwitchFlipped;
        }
    }
});

export const useViewStore = defineStore('viewStore', {
    
    state: () => ({
       
    }),
    actions: {
        
    },
    getters: {
        showUserAccount() {
            const createSwitchStore = useCreateSwitchStore();
            const createLoginSignupStore = useLoginSignupStore();
            return createLoginSignupStore.userLoggedIn && createLoginSignupStore.showUserAccount;
        },
        showLogin() {
            const createLoginSignupStore = useLoginSignupStore();
            return !createLoginSignupStore.userLoggedIn && !createLoginSignupStore.showSignup;
        },
        showSignup() {
            const createLoginSignupStore = useLoginSignupStore();
            return !createLoginSignupStore.userLoggedIn && !createLoginSignupStore.showLogin && !createLoginSignupStore.hasRegistered;
        },
        showHome() {
            const createLoginSignupStore = useLoginSignupStore();
            return createLoginSignupStore.userLoggedIn && !this.showUserAccount;
        }
    }
});

export const useErrorMessageStore = defineStore('errorMessageStore', {
    
    state: () => ({
        errorMessages: {
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
            },
            'mustVerifyEmail': {
                'id': 6,
                'text': 'Verify your email address before you login. Check your email and click on the verification link sent to you',
                'icon': 'info',
                'color': 'warning'
            },
            'acknowledgeTimeUntilFirstCheckIn': {
                'id': 7,
                'text': 'Please acknowledge that you must checkin before the above time, or your switch will be triggered',
                'icon': 'info',
                'color': 'warning'
            },
            'signupSuccess': {
                'id': 8,
                'text': 'Registration success',
                'icon': 'check_circle',
                'color': 'success'
            }
        },
        errorMessageArray: []
    }),
    
    actions: {
        errorMessageShown(errorId) {
            return this.errorMessageArray.findIndex(error => error.id == errorId) != -1;
        },
        removeErrorMessage(errorId) {
            let errorIndex = this.errorMessageArray.findIndex(error => error.id == errorId);
            if(errorIndex == -1) { return };
            this.errorMessageArray.splice(errorIndex, 1);
        },
        checkForErrors(errorObjectArray) {

            errorObjectArray.forEach((error) => {

                switch(error.type) {
                    case 'firstName':
                        if(!regexName.test(error.data) && !this.errorMessageShown(this.errorMessages.firstName.id)) {
                            this.errorMessageArray.push(this.errorMessages.firstName);
                        }
                        else if(regexName.test(error.data) && this.errorMessageShown(this.errorMessages.firstName.id)) {
                            this.removeErrorMessage(this.errorMessages.firstName.id);
                        };
                        break;
                    case 'lastName': {
                        if( !regexName.test(error.data) && !this.errorMessageShown(this.errorMessages.lastName.id) ) {
                            this.errorMessageArray.push(this.errorMessages.lastName);
                        }
                        else if(regexName.test(error.data) && this.errorMessageShown(this.errorMessages.lastName.id)) {
                            this.removeErrorMessage(this.errorMessages.lastName.id);
                        };
                        break;
                    }
                    case 'email': {
                        if( !regexEmail.test(error.data) && !this.errorMessageShown(this.errorMessages.email.id) ) {
                            this.errorMessageArray.push(this.errorMessages.email);
                        }
                        else if(regexEmail.test(error.data) &&
                            this.errorMessageShown(this.errorMessages.email.id)) {
                                this.removeErrorMessage(this.errorMessages.email.id);
                        };
                        break;
                    }
                    case 'mustCreateSwitchWithTimeBuffer': {
                        // Switch creation invalid checkin time (must be > 3 minutes left before user has to checkin)
                        if( error.data < 180 && !this.errorMessageShown(this.errorMessages.mustCreateSwitchWithTimeBuffer.id) ) {
                            this.errorMessageArray.push(this.errorMessages.mustCreateSwitchWithTimeBuffer);
                        }
                        else if(error.data > 180 && this.errorMessageShown(this.errorMessages.mustCreateSwitchWithTimeBuffer.id)) {
                            this.removeErrorMessage(this.errorMessages.mustCreateSwitchWithTimeBuffer.id);
                        };
                        break;
                    }
                    case 'mustVerifyEmail': {
                        // error.data == isEmailVerified:Boolean
                        if(!error.data && !this.errorMessageShown(this.errorMessages.mustVerifyEmail.id) ) {
                            this.errorMessageArray.push(this.errorMessages.mustVerifyEmail);
                        }
                        else if(regexEmail.test(error.data) &&
                            this.errorMessageShown(this.errorMessages.mustVerifyEmail.id)) {
                                this.removeErrorMessage(this.errorMessages.mustVerifyEmail.id);
                        };
                        break;
                    }
                    case 'acknowledgeTimeUntilFirstCheckIn': {
                        if( !error.data && !this.errorMessageShown(this.errorMessages.acknowledgeTimeUntilFirstCheckIn.id) ) {
                            this.errorMessageArray.push(this.errorMessages.acknowledgeTimeUntilFirstCheckIn);
                        }
                        else if(error.data > 180 && this.errorMessageShown(this.errorMessages.acknowledgeTimeUntilFirstCheckIn.id)) {
                            this.removeErrorMessage(this.errorMessages.acknowledgeTimeUntilFirstCheckIn.id);
                        };
                        break;
                    }
                    case 'signupSuccess': {
                        if( error.data && !this.errorMessageShown(this.errorMessages.signupSuccess.id) ) {
                            this.errorMessageArray.push(this.errorMessages.signupSuccess);
                        }
                        else if(error.data > 180 && this.errorMessageShown(this.errorMessages.signupSuccess.id)) {
                            this.removeErrorMessage(this.errorMessages.signupSuccess.id);
                        };
                        break;
                    }
                    default:
                        console.log('unhandled error message to display', error);
                };
            })
        }
    },
    getters: {
        
    }
});

export {
    regexName, regexPassword, regexEmail,
    secondsBeforeNewSwitchFlipped
}