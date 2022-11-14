<template>

<!-- <va-checkbox 
    class="mb-4" 
    v-model="acknowledgeTimeUntilFirstCheckIn" 
    label="Acknowledge" /> -->




<vue-countdown :time="secondsBeforeSwitchFlipped * 1000" v-slot="{ days, hours, minutes, seconds }">
  Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
</vue-countdown>
<!-- <span>Time Remaining：1 days, 23 hours, 59 minutes, 59 seconds.</span> -->

</template>



<script setup>

import { ref } from 'vue';
import { newSwitchData, acknowledgeTimeUntilFirstCheckIn } from '../../../../javascripts/stateManager';
import VueCountdown from '@chenfengyuan/vue-countdown';



let secondsBeforeSwitchFlipped = 
    ( newSwitchData.checkInTime - new Date(Date.now()) ) / 1000;

let switchIntervalInSeconds = 
    newSwitchData.checkInIntervalInDays * 24 * 60 * 60;


if(secondsBeforeSwitchFlipped < 0) {
    secondsBeforeSwitchFlipped = switchIntervalInSeconds + secondsBeforeSwitchFlipped    
};


let days = ref(secondsBeforeSwitchFlipped / 8.64e4 | 0);
let hours = ref((secondsBeforeSwitchFlipped % 8.64e4) / 3.6e3 | 0);
let minutes = ref((secondsBeforeSwitchFlipped % 3.6e3)  / 60 | 0);
let seconds = ref(secondsBeforeSwitchFlipped % 60);
//   let z = n=> (n < 10? '0' : '') + n;
//   return `${d}.${z(H)}:${z(m)}:${z(s)}`
// }
console.log(days.value)
console.log(hours.value)
console.log(minutes.value)
console.log(seconds.value)

// console.log(secsToTime(seconds));

</script>



<style lang="scss" scoped>



</style>
