<template>

<div class="final-message-wrapper">

    <p style="padding: 0 1rem .4rem 1rem;">What is your final message to them?</p>
    <va-input
        style="align-items: center;"
        class="mb-4"
        input-class="text--right"
        v-model="newSwitchData.finalMessage"
        type="textarea"
        label="What does this person need to know?"
        placeholder="Hi ma, I won't be making it home for supper tonight. You know what to do."
        :min-rows="5"
        :max-rows="20"
    />

</div>


</template>



<script setup>

// import { newSwitchData } from '../../../javascript/stateManager';

// Pinia stores
import { storeToRefs } from 'pinia'
import { useCreateSwitchStore } from '../../../javascript/stateManager';
let createSwitchStore = useCreateSwitchStore();
const {newSwitchData } = createSwitchStore;

</script>



<style lang="scss" scoped>

.final-message-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>
