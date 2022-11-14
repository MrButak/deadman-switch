<template>

<div class="create-switch-buttons">
    <va-button
    color="secondary"
    > 
    Cancel </va-button>
    <va-button @click="handleCreateSwitch"> Create </va-button>
</div>

</template>



<script setup>

import { checkForValidCookieAndGetUserId } from '../../../../javascripts/userManager';
import { newSwitchData, secondsBeforeNewSwitchFlipped,
        regexName, regexEmail
} from '../../../../javascripts/stateManager';

function areSwitchFieldsValid() {

    // let newSwitchData = reactive({
    //     recipientFirstName: '',
    //     recipientLastName: '',
    //     recipientEmail: '',
    //     checkInIntervalInDays: 1,
    //     checkInTime: new Date(),
    //     finalMessage: '',
    //     // Not sent to backend
    //     acknowledgeTimeUntilFirstCheckIn: false,
    //     checkInForTheFirstTime: false, // checkbox - will add checkInIntervalInDays to secondsBeforeSwitchFlipped (time before user needs to check in for the first time)
    //     secondsBeforeSwitchFlipped: null, // used to display a countdown timer
    //     switchIntervalInSeconds: null // checkInIntervalInDays to seconds
    // });

    if( !newSwitchData.acknowledgeTimeUntilFirstCheckIn ||
        !regexEmail.test(newSwitchData.recipientEmail) ||
        !regexName.test(newSwitchData.recipientFirstName) ||
        !regexName.test(newSwitchData.recipientLastName) ||
        newSwitchData.checkInIntervalInDays < 0 ||
        newSwitchData.checkInIntervalInDays > 4 ||
        new Date(newSwitchData.checkInTime).getTime() < 0 || // date validation
        !newSwitchData.finalMessage ||
        secondsBeforeNewSwitchFlipped.value < 300) // no switches can be set if they go off within 5 minutes 

            { 
                console.log(secondsBeforeNewSwitchFlipped.value)
                return false 
            }
    console.log(secondsBeforeNewSwitchFlipped.value)
    return true;
};

async function handleCreateSwitch() {

    // Form validation
    if(!areSwitchFieldsValid()) { 
        console.log('nope')
        return 
    };
    console.log('made it!')
    // Make sure the user is logged in and get their user id
    let userId = await checkForValidCookieAndGetUserId();
    if(!userId[0]) { return }; // not logged in
    if(!userId[1]) { return }; // logged in, but issue with user id

    // TODO: handle this logic somewhere else, before it gets here
    if(!newSwitchData.finalMessage) {
        newSwitchData.finalMessage = 'Hi ma, I won\'t be making it home for supper tonight. You know what to do.'
    };

    let request = await fetch(`${import.meta.env.VITE_BASE_URL}api/switch/create`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
            'newSwitchData': newSwitchData,
            'userId': userId[1]
        })
    });

    // Parse response
    let response = await request.json();
    console.log(response)
    // switch(response.status) {
    //     case '400':
    //         errorMessage.value = response.message;
    //         break;
    //     case '500':
    //         errorMessage.value = response.message;
    //         break;
    //     // 200 success
    //     default:
    //         showSignup.value = false;
    //         showLogin.value = true;
    //         hasRegistered.value = true;
    // };

};

</script>



<style lang="scss">

.create-switch-buttons {
    display: flex;
    justify-content: center;
    gap: 2rem;
}

</style>
