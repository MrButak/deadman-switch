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
import { newSwitchData, acknowledgeTimeUntilFirstCheckIn,
        regexName, regexEmail
} from '../../../../javascripts/stateManager';
// recipientFirstName: '',
// recipientLastName: '',
// recipientEmail: '',
// checkInIntervalInDays: 1,
// checkInTime: new Date(),
// finalMessage: ''
function areSwitchFieldsValid() {

    // if !acknowledgeTimeUntilFirstCheckIn
    // TODO: final message can be empty (falsy) and still pass this. Why?

    if( acknowledgeTimeUntilFirstCheckIn.value &&
        regexEmail.test(newSwitchData.recipientEmail) &&
        regexName.test(newSwitchData.recipientFirstName) &&
        regexName.test(newSwitchData.recipientLastName) &&
        newSwitchData.checkInIntervalInDays > 0 &&
        newSwitchData.checkInIntervalInDays < 4 &&
        new Date(newSwitchData.checkInTime).getTime() > 0 &&
        newSwitchData.finalMessage) 
            { return true }

    return false;
};

async function handleCreateSwitch() {

    // Form validation
    if(!areSwitchFieldsValid) { return };

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
