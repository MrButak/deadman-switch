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
import { newSwitchData, secondsBeforeNewSwitchFlipped,
        regexName, regexEmail,
        deadmanSwitches, showCreateDeadmanSwitch
} from '../../../javascript/stateManager';
import { handleCreateSwitchFormErrorMessages } from '../../../javascript/errorManager';

function areSwitchFieldsValid() {


    // Recalculate the secondsBeforeNewSwitchFlipped if still above 0 (below 0 will throw an error)
    if(( newSwitchData.checkInByTime - new Date(Date.now()) ) / 1000 > 0) {
        secondsBeforeNewSwitchFlipped.value =
            ( newSwitchData.checkInByTime - new Date(Date.now()) ) / 1000;   
    };
    
    // Look again for error messages / clear any old messages out
    handleCreateSwitchFormErrorMessages();

    if( !newSwitchData.acknowledgeTimeUntilFirstCheckIn ||
        !regexEmail.test(newSwitchData.recipientEmail) ||
        !regexName.test(newSwitchData.recipientFirstName) ||
        !regexName.test(newSwitchData.recipientLastName) ||
        newSwitchData.checkInIntervalInDays < 0 ||
        newSwitchData.checkInIntervalInDays > 4 ||
        new Date(newSwitchData.checkInByTime).getTime() < 0 || // date validation
        !newSwitchData.finalMessage ||
        secondsBeforeNewSwitchFlipped.value < 180) // no switches can be set if they go off within 5 minutes 
            { return false }
    return true;
};

async function handleCreateSwitch() {
    
    // Assign default final message if empty
    if(!newSwitchData.finalMessage) {
        newSwitchData.finalMessage = 'Hi ma, I won\'t be making it home for supper tonight. You know what to do.'
    };

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
        // NextCheckinByTime += interval
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
            deadmanSwitches.push(response.switch);
            // Hide the create switch view
            showCreateDeadmanSwitch.value = false;
            // Reset form data
            newSwitchData.recipientFirstName = '';
            newSwitchData.recipientFirstName = '';
            newSwitchData.recipientEmail = '';
            newSwitchData.finalMessage = '';
            newSwitchData.firstCheckedInAt = null;
            console.log('switch successfully created');
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
