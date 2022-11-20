<template>
    
<h2 class="va-h2" style="text-align: center;">
    Your Switches
</h2>

<!-- Deadman switch -->
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

<DeadmanSwitchInfoModal />

</template>



<script setup>

import { deadmanSwitches, showSwitchInfoModal, showFinalMessageModal, currentlyViewedSwitch } from '../../javascript/stateManager';
import { secondsBeforeSwitchExpires, handleCheckIn, isButtonLatchOpen } from '../../javascript/switchManager';
import { extractTimeFromDateObject } from '../../javascript/utils';
import DeadmanSwitchInfoModal from '../deadman-switch/DeadmanSwitchInfoModal.vue';
import DeadmanSwitch from '../deadman-switch/DeadmanSwitch.vue';

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
