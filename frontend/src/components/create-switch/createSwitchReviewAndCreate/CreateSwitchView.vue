<template>


<CreateSwitchReview />
<Spacer 
    padding-prop=".5rem 0"
/>
<CountdownTimer 
    :seconds-before-switch-flipped-prop="secondsBeforeNewSwitchFlipped"
    timer-sub-text="Before you must checkin"
/>
<Spacer 
    padding-prop=".5rem 0"
/>
<CreateSwitchReviewErrorMessages />
<Spacer 
    padding-prop=".5rem 0"
/>
<AcknowledgeFirstCheckIn />
<Spacer 
    padding-prop=".5rem 0"
/>
<CreateSwitchButton />


</template>



<script setup>

import { onMounted } from 'vue';
import { newSwitchData, secondsBeforeNewSwitchFlipped
} from '../../../../javascript/stateManager';

import { handleCreateSwitchFormErrorMessages } from '../../../../javascript/ErrorManager';

import AcknowledgeFirstCheckIn from './AcknowledgeFirstCheckIn.vue';
import CreateSwitchButton from './CreateSwitchButton.vue';
import CreateSwitchReview from './CreateSwitchReview.vue';
import CountdownTimer from '../../shared/CountdownTimer.vue';
import CreateSwitchReviewErrorMessages from './createSwitchReviewErrorMessages.vue';
import Spacer from '../../shared/Spacer.vue';


onMounted(() => {
    initTimer();
    handleCreateSwitchFormErrorMessages();
});

// Function calculates the seconds before the user needs to checkin for the first time
function initTimer() {

    secondsBeforeNewSwitchFlipped.value =
        ( newSwitchData.checkInTime - new Date(Date.now()) ) / 1000;

    newSwitchData.switchIntervalInSeconds = 
        newSwitchData.checkInIntervalInDays * 24 * 60 * 60;

    // Reset the switch if the clock runs down below 0
    if(secondsBeforeNewSwitchFlipped.value < 0) {
        
        secondsBeforeNewSwitchFlipped.value += newSwitchData.switchIntervalInSeconds;
    };


};


</script>



<style lang="scss" scoped>



</style>
