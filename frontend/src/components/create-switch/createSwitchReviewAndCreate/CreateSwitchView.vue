<template>

<CreateSwitchReview />
<CountdownTimer 
    :seconds-before-switch-flipped-prop="createSwitchStore.secondsBeforeNewSwitchExpires()"
    timer-sub-text="Before you must checkin"
/>
<ErrorMessages />
<AcknowledgeFirstCheckIn />
<CreateSwitchButton />

</template>



<script setup>

import { onMounted } from 'vue';
import {
    useErrorMessageStore, useCreateSwitchStore, useDeadmanSwitchStore
} from '../../../javascript/stateManager';

import AcknowledgeFirstCheckIn from './AcknowledgeFirstCheckIn.vue';
import CreateSwitchButton from './CreateSwitchButton.vue';
import CreateSwitchReview from './CreateSwitchReview.vue';
import CountdownTimer from '../../shared/CountdownTimer.vue';
import ErrorMessages from '../../shared/ErrorMessages.vue';

// Pinia stores
const createSwitchStore = useCreateSwitchStore();
const errorMessageStore = useErrorMessageStore();
const deadmanSwitchStore = useDeadmanSwitchStore();

onMounted(() => {
    handleCreateSwitchFormErrorMessages();
});
 
function handleCreateSwitchFormErrorMessages() {
    console.log(createSwitchStore.secondsBeforeNewSwitchExpires())
    let errorsToCheckFor = [
        { type: 'firstName', data: createSwitchStore.newSwitchData.recipientFirstName },
        { type: 'lastName', data: createSwitchStore.newSwitchData.recipientLastName },
        { type: 'email', data: createSwitchStore.newSwitchData.recipientEmail },
        { type: 'mustCreateSwitchWithTimeBuffer', data: createSwitchStore.secondsBeforeNewSwitchExpires() }
    ];
    errorMessageStore.checkForErrors(errorsToCheckFor);
};

</script>



<style lang="scss" scoped>



</style>
