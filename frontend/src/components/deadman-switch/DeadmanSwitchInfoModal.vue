<template>

<!-- Switch info modal -->
<va-modal
    v-model="showSwitchInfoModal"
    no-padding
>
    <template #content="{ ok }">
    <va-card-title>
        Switch Details
    </va-card-title>

    <va-card-content>
        <h6>Recipient details</h6>
    </va-card-content>
    
    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">First name</p>
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ recipientFirstName }}</p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Last name</p>
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ recipientLastName }}</p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Email</p>
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ recipientEmail }}</p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Final message</p>
        <va-icon
            v-model="showFinalMessageModal"
            @click="showFinalMessageModal = !showFinalMessageModal"
            class="mr-2"
            name="preview"
            size="2rem"
            color="success"
        />
    </va-card-actions>

    <va-card-content>
        <h6>Switch details</h6>
    </va-card-content>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Active</p>
        <p style="padding: 0 0 0 2rem" :class="activeTextColor"></p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Name</p>
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ switchName }}</p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Creation date</p>
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ new Date(createdAt).toLocaleString() }}</p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Check in every</p>
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ checkInIntervalInHours / 24 }} day(s)</p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">No later than</p>
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ new Date(checkInByTime).toLocaleTimeString() }}</p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Last check in</p>
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ new Date(lastCheckedInAt).toLocaleString() }}</p>
    </va-card-actions>

    <va-card-actions>
        <va-button @click="ok" color="warning">Ok</va-button>
    </va-card-actions>

    </template>
</va-modal>
<!-- Final message popup modal -->
<va-modal
    v-model="showFinalMessageModal"
    @click="showFinalMessageModal = !showFinalMessageModal"
    title="Final message"
    :message="finalMessage"
    fixed-layout
/>
</template>



<script setup>
import { ref } from 'vue';
import { showSwitchInfoModal, showFinalMessageModal } from '../../javascript/stateManager';
// let showSwitchInfoModal = ref(false);
// let showFinalMessageModal = ref(false)
defineProps({

    recipientFirstName: String,
    recipientLastName: String,
    recipientEmail: String,
    checkInByTime: String,
    switchName: String,
    createdAt: String,
    checkInIntervalInHours: Number,
    checkInByTime: String,
    lastCheckedInAt: String,
    finalMessage: String,
    activeTextColor: String
});

</script>



<style lang="scss">



</style>
