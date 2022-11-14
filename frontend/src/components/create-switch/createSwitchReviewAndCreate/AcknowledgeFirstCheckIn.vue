<template>


<!-- <va-checkbox 
    class="mb-4" 
    v-model="acknowledgeTimeUntilFirstCheckIn" 
    label="Acknowledge" 
/> -->

<va-checkbox 
    class="mb-4" 
    v-model="checkInForTheFirstTime" 
    label="Check in for the first time"
    @click="calculateNewSwitchTimer"
/>

<vue-countdown :time="secondsBeforeSwitchFlipped * 1000" v-slot="{ days, hours, minutes, seconds }">
    Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
</vue-countdown>

</template>



<script setup>

import { onMounted, ref, computed, watch, watchEffect } from 'vue';
import { newSwitchData, acknowledgeTimeUntilFirstCheckIn } from '../../../../javascripts/stateManager';
import VueCountdown from '@chenfengyuan/vue-countdown';

let secondsBeforeSwitchFlipped = ref(
    ( newSwitchData.checkInTime - new Date(Date.now()) ) / 1000 );

let checkInForTheFirstTime = ref(false);

let switchIntervalInSeconds = 
    newSwitchData.checkInIntervalInDays * 24 * 60 * 60;

if(secondsBeforeSwitchFlipped.value < 0) {
    secondsBeforeSwitchFlipped.value = switchIntervalInSeconds + secondsBeforeSwitchFlipped.value  
};


// let days = ref(secondsBeforeSwitchFlipped.value / 8.64e4 | 0);
// let hours = ref((secondsBeforeSwitchFlipped.value % 8.64e4) / 3.6e3 | 0);
// let minutes = ref((secondsBeforeSwitchFlipped.value % 3.6e3)  / 60 | 0);
// let seconds = ref(secondsBeforeSwitchFlipped.value % 60);


function calculateNewSwitchTimer() {
    if(checkInForTheFirstTime.value) {
        secondsBeforeSwitchFlipped.value += switchIntervalInSeconds;
        return;
    };
    secondsBeforeSwitchFlipped.value -= switchIntervalInSeconds;
}

</script>



<style lang="scss" scoped>



</style>
