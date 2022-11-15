<template>

<div class="time-picker-wrapper">
    <div class="display-time-wrapper">
        <p>No later than</p>
        <h6 class="va-h6">{{ doubleDigitHours }}:{{ doubleDigitMinutes }}</h6>
        <va-time-input v-model="newSwitchData.checkInTime" />
    </div>
    
</div>


</template>



<script setup>

import { computed } from 'vue';
import { newSwitchData } from '../../../../javascript/stateManager';


let doubleDigitHours = computed(() => {
    return newSwitchData.checkInTime.getHours() < 10 ?
        '0' + newSwitchData.checkInTime.getHours() :
        newSwitchData.checkInTime.getHours();
});
let doubleDigitMinutes = computed(() => {
    return newSwitchData.checkInTime.getMinutes() < 10 ?
        '0' + newSwitchData.checkInTime.getMinutes() :
        newSwitchData.checkInTime.getMinutes();
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
