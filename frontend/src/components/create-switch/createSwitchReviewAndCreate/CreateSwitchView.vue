<template>

<CreateSwitchReview />
<CountdownTimer 
    :seconds-before-switch-flipped-prop="secondsBeforeNewSwitchFlipped"
    timer-sub-text="Before you must checkin"
/>
<CreateSwitchReviewErrorMessages />
<AcknowledgeFirstCheckIn />
<CreateSwitchButton />

</template>



<script setup>

import { onMounted } from 'vue';
import { 
    // newSwitchData, 
    secondsBeforeNewSwitchFlipped,
    regexEmail, regexName, formErrorMessages
} from '../../../javascript/stateManager';

// import { handleCreateSwitchFormErrorMessages } from '../../../javascript/errorManager';

import AcknowledgeFirstCheckIn from './AcknowledgeFirstCheckIn.vue';
import CreateSwitchButton from './CreateSwitchButton.vue';
import CreateSwitchReview from './CreateSwitchReview.vue';
import CountdownTimer from '../../shared/CountdownTimer.vue';
import CreateSwitchReviewErrorMessages from './CreateSwitchReviewErrorMessages.vue';

// Pinia stores
import { storeToRefs } from 'pinia'
import { useCreateSwitchStore } from '../../../javascript/stateManager';
let createSwitchStore = useCreateSwitchStore();
const { newSwitchData, createSwitchReviewErrorMessages } = createSwitchStore;

onMounted(() => {
    calculateSecondsBeforeSwitchFlipped();
    handleCreateSwitchFormErrorMessages();
});

// ****************************************************************************
// Function calculates the seconds before the user needs to checkin for the first time
// ****************************************************************************
function calculateSecondsBeforeSwitchFlipped(mustCheckInByDateObject, checkInIntervalInDays) {

    secondsBeforeNewSwitchFlipped.value =
        ( newSwitchData.checkInByTime - new Date(Date.now()) ) / 1000;

    // Add the check in interval if the time to check in has already passed
    if(secondsBeforeNewSwitchFlipped.value < 0) {
        secondsBeforeNewSwitchFlipped.value += (newSwitchData.checkInIntervalInDays * 24 * 60 * 60);
    };
};

// ****************************************************************************
// Function will check is an error message is already displayed on the DOM
// ****************************************************************************
function errorMessageShown(errorId, errorMessagesArray) {

    return errorMessagesArray.findIndex(error => error.id == errorId) != -1;
};

// ****************************************************************************
// Function will remove an error message from the DOM
// ****************************************************************************
function removeErrorMessage(errorId, errorMessagesArray) {

    let errorIndex = errorMessagesArray.findIndex(error => error.id == errorId);
    if(errorIndex == -1) { return };
    errorMessagesArray.splice(errorIndex, 1);
};

// ****************************************************************************
// Function will check for valid form fields and options and display any errors
// ****************************************************************************
function handleCreateSwitchFormErrorMessages() {

    // First name
    if( !regexName.test(newSwitchData.recipientFirstName) &&
        !errorMessageShown(formErrorMessages.firstName.id, createSwitchReviewErrorMessages) ) {
        
            createSwitchReviewErrorMessages.push(formErrorMessages.firstName);
    }
    else if(regexName.test(newSwitchData.recipientFirstName) && 
        errorMessageShown(formErrorMessages.firstName.id, createSwitchReviewErrorMessages)) {
        
            removeErrorMessage(formErrorMessages.firstName.id, createSwitchReviewErrorMessages);
    };

    // Last name
    if( !regexName.test(newSwitchData.recipientLastName) &&
        !errorMessageShown(formErrorMessages.lastName.id, createSwitchReviewErrorMessages) ) {

            createSwitchReviewErrorMessages.push(formErrorMessages.lastName);
    }
    else if(regexName.test(newSwitchData.recipientLastName) &&
        errorMessageShown(formErrorMessages.lastName.id, createSwitchReviewErrorMessages)) {
        
            removeErrorMessage(formErrorMessages.lastName.id, createSwitchReviewErrorMessages);
    };

    // Email
    if( !regexEmail.test(newSwitchData.recipientEmail) &&
        !errorMessageShown(formErrorMessages.email.id, createSwitchReviewErrorMessages) ) {

            createSwitchReviewErrorMessages.push(formErrorMessages.email);
    }
    else if(regexEmail.test(newSwitchData.recipientEmail) &&
        errorMessageShown(formErrorMessages.email.id, createSwitchReviewErrorMessages)) {
        
            removeErrorMessage(formErrorMessages.email.id, createSwitchReviewErrorMessages);
    };

    // Switch creation invalid checkin time (must be > 3 minutes left before user has to checkin)
    if( secondsBeforeNewSwitchFlipped.value < 180 &&
        !errorMessageShown(formErrorMessages.mustCreateSwitchWithTimeBuffer.id, createSwitchReviewErrorMessages) ) {

            createSwitchReviewErrorMessages.push(formErrorMessages.mustCreateSwitchWithTimeBuffer);
    }
    else if(secondsBeforeNewSwitchFlipped.value > 180 &&
        errorMessageShown(formErrorMessages.mustCreateSwitchWithTimeBuffer.id, createSwitchReviewErrorMessages)) {
        
            removeErrorMessage(formErrorMessages.mustCreateSwitchWithTimeBuffer.id, createSwitchReviewErrorMessages);
    };
};

</script>



<style lang="scss" scoped>



</style>
