<template>

<div class="acknowledge-first-checkin-wrapper">
<div class="checkbox-and-text-wrapper">
    <div class="checkbox-wrapper">
        <va-checkbox
            @click="errorMessageStore.checkForErrors([{ type: 'acknowledgeTimeUntilFirstCheckIn', data: newSwitchData.acknowledgeTimeUntilFirstCheckIn }])"
            class="mb-4" 
            v-model="newSwitchData.acknowledgeTimeUntilFirstCheckIn" 
            color="success"
        />
    </div>

    <div class="text-wrapper">
        <p>I acknowledge my first checkin needs to be before the timer runs out or my deadman switch will trigger</p>
    </div>
</div>
</div>

</template>



<script setup>

import { onMounted } from 'vue';

// Pinia stores
import { storeToRefs } from 'pinia'
import { useCreateSwitchStore, useErrorMessageStore } from '../../../javascript/stateManager';

const createSwitchStore = useCreateSwitchStore();
const errorMessageStore = useErrorMessageStore();
const { newSwitchData } = storeToRefs(createSwitchStore);

</script>



<style lang="scss" scoped>

.acknowledge-first-checkin-wrapper {
    display: flex;
    justify-content: center;

    .checkbox-and-text-wrapper {
        display: flex;
        justify-content: center;
        width: calc(80% - 0.5rem);
        gap: 0.5rem;
        .checkbox-wrapper {
            padding: 0 0.5rem 0 0;
        }
        .text-wrapper {

        }
    }
}

</style>
