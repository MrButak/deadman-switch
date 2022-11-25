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
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ currentlyViewedSwitch.recipient_first_name }}</p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Last name</p>
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ currentlyViewedSwitch.recipient_last_name }}</p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Email</p>
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ currentlyViewedSwitch.recipient_email }}</p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Final message</p>
        <va-icon
            v-model="showFinalMessageModal"
            @click="showFinalMessageModal = true"
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
        <p style="padding: 0 0 0 2rem" :class="secondsBeforeSwitchExpires(currentlyViewedSwitch.check_in_by_time) > 0 ? 'va-text-success' : 'va-text-danger'">{{ secondsBeforeSwitchExpires(currentlyViewedSwitch.check_in_by_time) > 0 }}</p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Name</p>
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ currentlyViewedSwitch.switch_name }}</p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Creation date</p>
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ new Date(currentlyViewedSwitch.created_at).toLocaleString() }}</p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Check in every</p>
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ currentlyViewedSwitch.check_in_interval_in_hours / 24 }} day(s)</p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">No later than</p>
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ new Date(currentlyViewedSwitch.check_in_by_time).toLocaleTimeString() }}</p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Last check in</p>
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ new Date(currentlyViewedSwitch.last_checked_in_at).toLocaleString() }}</p>
    </va-card-actions>

    <va-card-actions>
        <va-button @click="ok" color="warning">Ok</va-button>
    </va-card-actions>

    </template>
</va-modal>

<!-- Final message popup modal -->
<va-modal
    v-model="showFinalMessageModal"
    @click="showFinalMessageModal = false"
    title="Final message"
    :message="currentlyViewedSwitch.final_message"
    fixed-layout
/>

</template>



<script setup>

// import { showSwitchInfoModal, showFinalMessageModal, currentlyViewedSwitch } from '../../javascript/stateManager';
import { secondsBeforeSwitchExpires } from '../../javascript/switchManager';

// Pinia stores
import { storeToRefs } from 'pinia'
import {useDeadmanSwitchStore} from '../../javascript/stateManager';
let deadmanSwitchStore = useDeadmanSwitchStore();
const { currentlyViewedSwitch, showSwitchInfoModal, showFinalMessageModal } = storeToRefs(deadmanSwitchStore);

</script>



<style lang="scss">



</style>
