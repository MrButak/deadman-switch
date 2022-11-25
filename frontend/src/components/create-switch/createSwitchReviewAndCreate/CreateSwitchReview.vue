<template>

<div class="review-switch-wrapper row row">
    <div class="flex md6 lg4">
      <va-card>
        <va-card-title>Recipient information</va-card-title>
        <va-card-actions align="between">
          <p style="padding: 0 2rem 0 0">First name</p>
          <p style="padding: 0 0 0 2rem" class="va-text-success">{{ newSwitchData.recipientFirstName }}</p>
        </va-card-actions>
        <va-card-actions align="between">
          <p style="padding: 0 2rem 0 0">Last name</p>
          <p style="padding: 0 0 0 2rem" class="va-text-success">{{ newSwitchData.recipientLastName }}</p>
        </va-card-actions>
        <va-card-actions align="between">
          <p style="padding: 0 2rem 0 0">Email</p>
          <p style="padding: 0 0 0 2rem" class="va-text-success">{{ newSwitchData.recipientEmail }}</p>
        </va-card-actions>
        <va-card-actions align="between">
          <p style="padding: 0 2rem 0 0">Final message</p>
          <va-icon
            @click="showFinalMessageModal = !showFinalMessageModal"
            class="mr-2"
            name="preview"
            size="2rem"
            color="success"
        />

        </va-card-actions>

        <va-card-title>Switch settings</va-card-title>
        <va-card-actions align="between">
          <p>Check in every</p>
          <p class="va-text-success">{{ newSwitchData.checkInIntervalInDays }} day</p>
        </va-card-actions>
        <va-card-actions align="between">
          <p style="padding: 0 2rem 0 0">No later than</p>
          <p style="padding: 0 0 0 2rem" class="va-text-success">{{ newSwitchData.checkInByTime.toLocaleTimeString() }}</p>
        </va-card-actions>

    </va-card>
    </div>
</div>
<!-- Final message popup modal -->
<va-modal
    v-model="showFinalMessageModal"
    title="Final message"
    :message="finalMessage"
    fixed-layout
/>

</template>



<script setup>

import { ref, computed, onMounted } from 'vue';
// import { newSwitchData } from '../../../javascript/stateManager';

// Pinia stores
import { storeToRefs } from 'pinia'
import { useCreateSwitchStore } from '../../../javascript/stateManager';
let createSwitchStore = useCreateSwitchStore();
const { newSwitchData } = createSwitchStore;

// Set the acknowledge checkbox to false
onMounted(() => {
    newSwitchData.acknowledgeTimeUntilFirstCheckIn = false;
});

// Popup modal which displays user's final message
let showFinalMessageModal = ref(false);

// Default final message
let finalMessage = computed(() => {
    // TODO: this will not work if the user gets this default, then goes back and changes to a custom final message. I should do this check right before the data is sent to the backend.
    return !newSwitchData.finalMessage ?
        'Hi ma, I won\'t be making it home for supper tonight. You know what to do.' :
        newSwitchData.finalMessage;
});

</script>



<style lang="scss">

.review-switch-wrapper {
    justify-content: center;
}

</style>
    