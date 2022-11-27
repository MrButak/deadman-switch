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

import { checkForValidCookieAndGetUserId } from '../../../javascript/userManager';
import { 
        secondsBeforeNewSwitchFlipped,
        regexName, regexEmail,
        useDeadmanSwitchStore, useCreateSwitchStore, useErrorMessageStore
} from '../../../javascript/stateManager';

// Pinia store
let deadmanSwitchStore = useDeadmanSwitchStore();
let errorMessageStore = useErrorMessageStore();
let createSwitchStore = useCreateSwitchStore();
let { newSwitchData } = useCreateSwitchStore();

function areSwitchFieldsValid() {

    // Recalculate the secondsBeforeNewSwitchFlipped if still above 0 (below 0 will throw an error)
    if((newSwitchData.checkInByTime - new Date(Date.now())) / 1000 > 0) {
        secondsBeforeNewSwitchFlipped.value = 
            ( newSwitchData.checkInByTime - new Date(Date.now()) ) / 1000;   
    };

    if( 
        !newSwitchData.acknowledgeTimeUntilFirstCheckIn ||
        !regexEmail.test(newSwitchData.recipientEmail) ||
        !regexName.test(newSwitchData.recipientFirstName) ||
        !regexName.test(newSwitchData.recipientLastName) ||
        newSwitchData.checkInIntervalInDays < 0 ||
        newSwitchData.checkInIntervalInDays > 4 ||
        new Date(newSwitchData.checkInByTime).getTime() < 0 ||
        !newSwitchData.finalMessage ||
        secondsBeforeNewSwitchFlipped.value < 180
    )   { return false };

    return true;
};

async function handleCreateSwitch() {
    
    // Assign default final message if empty
    if(!newSwitchData.finalMessage) {
        newSwitchData.finalMessage = 'Hi ma, I won\'t be making it home for supper tonight. You know what to do.'
    };

    errorMessageStore.checkForErrors([
        // Edge case: If the user arrives at this view with > 3 minutes left, there will be now error, but if they wait until there is < 3 minutes left before the switch expires, no error will show. So this will display that error message again if needed.
        { type: 'mustCreateSwitchWithTimeBuffer', data: secondsBeforeNewSwitchFlipped.value },
        // Make sure the user checked the acknowledge box
        { type: 'acknowledgeTimeUntilFirstCheckIn', data: newSwitchData.acknowledgeTimeUntilFirstCheckIn }
    ]);

    // Form validation
    if(!areSwitchFieldsValid()) { return };
    
    // Make sure the user is logged in and get their user id
    let userId = await checkForValidCookieAndGetUserId();
    if(!userId[0]) { return }; // not logged in
    if(!userId[1]) { return }; // logged in, but issue with user id

    // Calculate the time the user first checked in according to the time the user selected and the time now
    if(newSwitchData.checkInByTime > new Date(Date.now()) ) {
        newSwitchData.firstCheckedInAt = new Date(newSwitchData.checkInByTime).setHours(new Date(newSwitchData.checkInByTime).getHours() - (newSwitchData.checkInIntervalInDays * 24) );
    }
    else {
        newSwitchData.firstCheckedInAt = newSwitchData.checkInByTime;
        newSwitchData.checkInByTime.setHours(newSwitchData.checkInByTime.getHours() + (newSwitchData.checkInIntervalInDays * 24));
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
    
    switch(response.status) {
        case '200':
            // Push newly created switch into the State
            deadmanSwitchStore.deadmanSwitches.push(response.switch);
            // Reset the State
            createSwitchStore.$reset();
            errorMessageStore.$reset();
            break;
        case '500':
            break;
        case '400':
            break;
        default:
            
    };

};

</script>



<style lang="scss">

.create-switch-buttons {
    display: flex;
    justify-content: center;
    gap: 2rem;
}

</style>
