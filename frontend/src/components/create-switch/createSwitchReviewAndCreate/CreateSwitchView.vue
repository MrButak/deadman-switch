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
import { newSwitchData, secondsBeforeNewSwitchFlipped
} from '../../../javascript/stateManager';

import { handleCreateSwitchFormErrorMessages } from '../../../javascript/errorManager';

import AcknowledgeFirstCheckIn from './AcknowledgeFirstCheckIn.vue';
import CreateSwitchButton from './CreateSwitchButton.vue';
import CreateSwitchReview from './CreateSwitchReview.vue';
import CountdownTimer from '../../shared/CountdownTimer.vue';
import CreateSwitchReviewErrorMessages from './CreateSwitchReviewErrorMessages.vue';


onMounted(() => {
    calculateSecondsBeforeSwitchFlipped();
    handleCreateSwitchFormErrorMessages();
});

// Function calculates the seconds before the user needs to checkin for the first time
function calculateSecondsBeforeSwitchFlipped(mustCheckInByDateObject, checkInIntervalInDays) {

    secondsBeforeNewSwitchFlipped.value =
        ( newSwitchData.checkInByTime - new Date(Date.now()) ) / 1000;

    // Add the check in interval if the time to check in has already passed
    if(secondsBeforeNewSwitchFlipped.value < 0) {
        secondsBeforeNewSwitchFlipped.value += (newSwitchData.checkInIntervalInDays * 24 * 60 * 60);
    };
};


</script>



<style lang="scss" scoped>



</style>
