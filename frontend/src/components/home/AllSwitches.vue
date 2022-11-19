<template>
    
<h2 class="va-h2" style="text-align: center;">
    Your Switches
</h2>
<span v-for="dmSwitch in deadmanSwitches">
    <DeadmanSwitch
        :seconds-before-new-switch-flipped-prop="secondsBeforeSwitchExpires(dmSwitch.check_in_by_time)"
        :switch-name="dmSwitch.switch_name"
        :check-in-by-info-text="`Check in by : ${extractTimeFromDateObject(dmSwitch.check_in_by_time)} every ${dmSwitch.check_in_interval_in_hours / 24} day(s)`"
        :switch-color="determineSwitchColor(secondsBeforeSwitchExpires(dmSwitch.check_in_by_time), dmSwitch.check_in_by_time, dmSwitch.check_in_interval_in_hours)"
        :switch-button-text="determineSwitchButtonText(secondsBeforeSwitchExpires(dmSwitch.check_in_by_time), dmSwitch.check_in_by_time, dmSwitch.check_in_interval_in_hours)"
        @handle-check-in="handleCheckIn(dmSwitch.id, dmSwitch.check_in_by_time, dmSwitch.check_in_interval_in_hours, dmSwitch.last_checked_in_at)"
        @handle-show-switch-info-modal="handleShowSwitchInfoModal(dmSwitch)"
        :last-checked-in="new Date(dmSwitch.last_checked_in_at).toLocaleString()"
        :switch-button-icon="determineSwitchButtonIcon(secondsBeforeSwitchExpires(dmSwitch.check_in_by_time), dmSwitch.check_in_by_time, dmSwitch.check_in_interval_in_hours)"
        :show-switch-expired-message="secondsBeforeSwitchExpires(dmSwitch.check_in_by_time) < 1"
    /> 
</span>

<!-- Switch info modal -->
<DeadmanSwitchInfoModal 
    :final-message="currentlyViewedSwitch.final_message"
    :recipient-first-name="currentlyViewedSwitch.recipient_first_name"
    :recipient-last-name="currentlyViewedSwitch.recipient_last_name"
    :recipient-email="currentlyViewedSwitch.recipient_email"
    :switch-name="currentlyViewedSwitch.switch_name"
    :created-at="currentlyViewedSwitch.created_at"
    :check-in-interval-in-hours="currentlyViewedSwitch.check_in_interval_in_hours"
    :check-in-by-time="currentlyViewedSwitch.check_in_by_time"
    :last-checked-in-at="currentlyViewedSwitch.last_checked_in_at"
    :active-text-color="secondsBeforeSwitchExpires(currentlyViewedSwitch.check_in_by_time) > 0 ? 'va-text-success' : 'va-text-danger'"
    :is-active="secondsBeforeSwitchExpires(currentlyViewedSwitch.check_in_by_time) > 0"
/>

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

import { reactive } from 'vue';
import { deadmanSwitches, showSwitchInfoModal, showFinalMessageModal } from '../../javascript/stateManager';
import { checkForValidCookieAndGetUserId } from '../../javascript/userManager';
import { secondsBeforeSwitchExpires } from '../../javascript/switchManager';
import { extractTimeFromDateObject } from '../../javascript/utils';
import DeadmanSwitchInfoModal from '../deadman-switch/DeadmanSwitchInfoModal.vue';
import DeadmanSwitch from '../deadman-switch/DeadmanSwitch.vue';

// This data will populate the switch info modal
let currentlyViewedSwitch = reactive({});

// ********************************************************************
// Function will determine if a user can reset their switch.
// ********************************************************************
function isButtonLatchOpen(checkInByTimestamp, checkInIntervalInHours) {
    // checkInByTime - now < interval ?
    let secondsFromEpochToCheckInByTime = new Date(checkInByTimestamp).getTime() / 1000;
    let secondsFromEpochToNow = new Date(Date.now()).getTime() / 1000;
    let isButtonOpen = (secondsFromEpochToCheckInByTime - secondsFromEpochToNow) < (checkInIntervalInHours * 60 * 60);
    return secondsBeforeSwitchExpires(checkInByTimestamp) <= 0 ?
        false :
        isButtonOpen;
};

// ********************************************************************
// Function is called when a user clicks the check in button
// ********************************************************************
async function handleCheckIn(switchId, checkInByTimestamp, checkInIntervalInHours) {

    if(!isButtonLatchOpen(checkInByTimestamp, checkInIntervalInHours)) { return };
    
    // Make sure user is logged in and get user id
    let userId = await checkForValidCookieAndGetUserId();
    if(!userId[0]) { return }; // not logged in
    if(!userId[1]) { return }; // logged in, but issue with user id
    
    // Extend the switch checkInByTime by the check in interval    
    let newCheckInTime = new Date(new Date(checkInByTimestamp).setHours(new Date(checkInByTimestamp).getHours() + (checkInIntervalInHours)));
    
    // Write the switches new checkInByTime to the DB
    let request = await fetch(`${import.meta.env.VITE_BASE_URL}api/switch/checkin`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
            'deadmanSwitchId': switchId,
            'appUserId': userId[1],
            'newCheckInByTime': newCheckInTime
        })
    });

    // Parse response
    let response = await request.json();
    switch(response.status) {
        case '200':
            // Replace the old switch with the newly updated check_in_by_time switch
            deadmanSwitches[deadmanSwitches.findIndex(dmSwitch => dmSwitch.id == response.switch.id)] = response.switch;
            break;
        case '500':
            break;
        default:  
    };
};

// ********************************************************************
// Function will show a pop up modal displaying all switch details and assign Component State
// ********************************************************************
function handleShowSwitchInfoModal(dmSwitch) {
    // Assign the currently viewed switch to the Component State
    Object.assign(currentlyViewedSwitch, dmSwitch);
    // Show pop up modal
    showSwitchInfoModal.value = !showSwitchInfoModal.value;
};

// ********************************************************************
// Switch UI helpers
// ********************************************************************
function determineSwitchButtonIcon(timeLeftInSeconds, checkInByTimestamp, checkInIntervalInHours) {

    return !isButtonLatchOpen(checkInByTimestamp, checkInIntervalInHours) && timeLeftInSeconds > 0 ?
        'done' : // check mark
        '';
};
function determineSwitchColor(timeLeftInSeconds, checkInByTimestamp, checkInIntervalInHours) {

    if(timeLeftInSeconds < 3600) { // 1 hour
        return 'danger'; // red
    }
    else if(timeLeftInSeconds < 7200) {
        return 'warning'; // yellow
    }
    else if(!isButtonLatchOpen(checkInByTimestamp, checkInIntervalInHours) && timeLeftInSeconds > 0) {
        return 'success'; // green
    };
    return 'info'; // blue
};
function determineSwitchButtonText(timeLeftInSeconds, checkInByTimestamp, checkInIntervalInHours) {

    if(timeLeftInSeconds <= 0) {
        return 'Dead'
    }
    else if(isButtonLatchOpen(checkInByTimestamp, checkInIntervalInHours) && timeLeftInSeconds > 0) {
        return 'Check In';
    };
};

</script>



<style lang="scss" scoped>



</style>
