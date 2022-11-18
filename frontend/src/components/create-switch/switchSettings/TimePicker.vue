<template>

<div class="time-picker-wrapper">
    <div class="display-time-wrapper">
        <p>No later than</p>
        <h6 class="va-h6">{{ doubleDigitHours }}:{{ doubleDigitMinutes }}</h6>
        <va-time-input v-model="newSwitchData.checkInByTime" />
    </div>
    
</div>


</template>



<script setup>

import { computed } from 'vue';
import { newSwitchData } from '../../../javascript/stateManager';


let doubleDigitHours = computed(() => {
    return newSwitchData.checkInByTime.getHours() < 10 ?
        '0' + newSwitchData.checkInByTime.getHours() :
        newSwitchData.checkInByTime.getHours();
});
let doubleDigitMinutes = computed(() => {
    return newSwitchData.checkInByTime.getMinutes() < 10 ?
        '0' + newSwitchData.checkInByTime.getMinutes() :
        newSwitchData.checkInByTime.getMinutes();
});


</script>



<style lang="scss" scoped>

.time-picker-wrapper {
    display: flex;
    flex-direction: column;
    .display-time-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: .3rem;
        h6 {
            text-align: center;
        }
    }
    
}

</style>
