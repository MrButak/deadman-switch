<template>

<!-- Switch info modal -->
<va-modal
    v-model="showSwitchInfoModal"
    
    no-padding>


    <template #content="{ ok }">


    <va-card-content>
        <h6 class="va-h6">Recipient details</h6>
    </va-card-content>
    
    <va-card-actions align="between">
        <p style="padding: 0 6rem 0 0">First name</p>
        <p style="padding: 0 0 0 6rem" class="va-text-success">{{ currentlyViewedSwitch.recipient_first_name }}</p>
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
            @click="showFinalMessageModal = true"
            class="mr-2"
            name="preview"
            size="medium"
            color="success"
        />
    </va-card-actions>

    <va-card-content>
        <h6 class="va-h6">Switch details</h6>
    </va-card-content>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Active</p>
        <p style="padding: 0 0 0 2rem" 
            :class="deadmanSwitchStore.secondsBeforeSwitchExpires(currentlyViewedSwitch.check_in_by_timestamp) > 0 ? 'va-text-success' : 'va-text-danger'">{{ deadmanSwitchStore.secondsBeforeSwitchExpires(currentlyViewedSwitch.check_in_by_timestamp) > 0 }}
        </p>
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
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ new Date(currentlyViewedSwitch.check_in_by_timestamp).toLocaleTimeString() }}</p>
    </va-card-actions>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Last check in</p>
        <p style="padding: 0 0 0 2rem" class="va-text-success">{{ new Date(currentlyViewedSwitch.last_checked_in_at).toLocaleString() }}</p>
    </va-card-actions>
    
    <va-card-content>
        <h6 class="va-h6">Switch settings</h6>
    </va-card-content>

    <va-card-actions align="between">
        <p style="padding: 0 2rem 0 0">Delete switch</p>
        <va-icon
            @click="showDeleteMessageModal = true"
            class="mr-2"
            name="delete"
            size="medium"
            color="danger"
        />
    </va-card-actions>

    <va-card-actions>
        <va-button @click="ok" color="warning">Ok</va-button>
    </va-card-actions>


    </template>
</va-modal>

<!-- Final message popup modal -->
<va-modal
    v-model="showFinalMessageModal"
    title="Final message"
    :message="currentlyViewedSwitch.final_message"
    fixed-layout
/>

<!-- Delete switch popup modal -->
<va-modal
    v-model="showDeleteMessageModal"
    title="Delete switch"
    max-width="28rem"
    no-dismiss
    hide-default-actions
    overlay-opacity="0.2"
    fixed-layout>

    <p class="w-96">
        This action cannot be undone. <text>This will permanently delete this deadman switch</text>.
        Please type <span class="va-text-danger">DELETE</span> to confirm.
    </p>
    <va-input class="w-96 pt-3 pb-4"
        v-model="userDeletionString"
    >

    </va-input>
    <div class="flex gap-12 w-full">
        <va-button
            @click="showDeleteMessageModal = false"
            color="secondary"
        >
            Cancel
        </va-button>
        <va-button
            @click="handleDeleteSwitch"
            color="danger"
        >
            Delete
        </va-button>
    </div>
</va-modal>

</template>



<script setup>

import { ref } from 'vue';
// Pinia stores
import { storeToRefs } from 'pinia'
import {useDeadmanSwitchStore} from '../../../javascript/stateManager';
let deadmanSwitchStore = useDeadmanSwitchStore();
const { currentlyViewedSwitch, showSwitchInfoModal, showFinalMessageModal, showDeleteMessageModal } = storeToRefs(deadmanSwitchStore);

let switchDeletionString = 'DELETE';
let userDeletionString = ref('');

async function handleDeleteSwitch() {
    
    if(switchDeletionString !== userDeletionString.value) { return };
    userDeletionString.value = '';
    showDeleteMessageModal.value = false;

    let request = await fetch(`${import.meta.env.VITE_BASE_URL}api/switch/delete`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
            switchId: currentlyViewedSwitch.value.id
        })
    });
    let response = await request.json();
    switch(response.status) {
        case '200':
            // Remove switch from state
            deadmanSwitchStore.removeSwitchFromState(currentlyViewedSwitch.value.id);
            // Close modals
            showDeleteMessageModal.value = false;
            showSwitchInfoModal.value = false;
            break;
        case '500':
            console.log(response.status)
            break;
        default:
            console.log('unhandled response during switch deletion', response);
    };
};

</script>



<style lang="scss">



</style>
