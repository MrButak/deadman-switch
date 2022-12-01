<template>

<div class="time-picker-wrapper">
    <div class="display-time-wrapper">
        <p>No later than</p>
        <h6 class="va-h6">{{ createSwitchStore.doubleDigitHours }}:{{ createSwitchStore.doubleDigitMinutes }}</h6>
        <va-time-input v-model="createSwitchStore.newSwitchData.checkInByTime" />
    </div>
</div>

</template>



<script setup>

// Pinia store
import { useCreateSwitchStore } from '../../../javascript/stateManager';
const createSwitchStore = useCreateSwitchStore();

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
