<template>
    
<h2 class="va-h2" style="text-align: center;">Your Switches</h2>
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
<va-modal
    v-model="showCustomContent"
    no-padding
>
    <template #content="{ ok }">
    <!-- <va-image :ratio="16/9" src="https://picsum.photos/1500" /> -->
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
        <p style="padding: 0 0 0 2rem" :class="determineActiveTextColor(secondsBeforeSwitchExpires(currentlyViewedSwitch.check_in_by_time) > 0)">{{ secondsBeforeSwitchExpires(currentlyViewedSwitch.check_in_by_time) > 0 }}</p>
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
        <va-button @click="ok" color="warning">Ok!</va-button>
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

</template>



<script setup>

import { reactive, ref } from 'vue';
import { deadmanSwitches } from '../../javascript/stateManager';
import DeadmanSwitch from '../deadman-switch/DeadmanSwitch.vue';
import { checkForValidCookieAndGetUserId } from '../../javascript/userManager';

// Pop up switch info modal
let showCustomContent = ref(false);
let currentlyViewedSwitch = reactive({});
let showFinalMessageModal = ref(false); // final message modal
function determineActiveTextColor(isActive) {
    return isActive ?
        'va-text-success' :
        'va-text-danger';
}

// Function calculates the seconds before the user needs to check in
function secondsBeforeSwitchExpires(checkInByTime) {

    // Calculate seconds until switch Expires
    let secondsUntilSwitchFlipped =
        ( (new Date(checkInByTime).getTime() / 1000 ) - ( new Date(Date.now()) ) / 1000 );

    // Countdown timer can't take a negative number
    if(secondsUntilSwitchFlipped < 0) { return 0 };

    return secondsUntilSwitchFlipped;    
};

// Function will determine if a user can reset their switch.
function isButtonLatchOpen(checkInByTimestamp, checkInIntervalInHours) {

    // checkInByTime - now < interval ?
    let secondsFromEpochToCheckInByTime = new Date(checkInByTimestamp).getTime() / 1000;
    let secondsFromEpochToNow = new Date(Date.now()).getTime() / 1000;
    let isButtonOpen = (secondsFromEpochToCheckInByTime - secondsFromEpochToNow) < (checkInIntervalInHours * 60 * 60);
    return secondsBeforeSwitchExpires(checkInByTimestamp) <= 0 ?
        false :
        isButtonOpen;
};

// Function will show a pop up modal displaying all switch details
function handleShowSwitchInfoModal(dmSwitch) {

    // Show pop up modal
    showCustomContent.value = !showCustomContent.value
    // Assign the currently viewed switch to the reactive Object
    Object.assign(currentlyViewedSwitch, dmSwitch);
};


function determineSwitchButtonText(timeLeftInSeconds, checkInByTimestamp, checkInIntervalInHours) {
    
    if(timeLeftInSeconds <= 0) {
        return 'Dead'
    }
    else if(isButtonLatchOpen(checkInByTimestamp, checkInIntervalInHours) && timeLeftInSeconds > 0) {
        return 'Check In';
    };
};

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
            console.log(response.message)
            break;
        case '500':
            break;
        default:  
    };
};

function determineSwitchButtonIcon(timeLeftInSeconds, checkInByTimestamp, checkInIntervalInHours) {

    if(!isButtonLatchOpen(checkInByTimestamp, checkInIntervalInHours) && timeLeftInSeconds > 0) {
        return 'done'; // check mark
    }
    return '';
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

// Extract just the Time (HH:MM:SS) from a Date Object
function extractTimeFromDateObject(dateObj) {
    
    let timeString = '';
    let hoursString = new Date(dateObj).getHours();
    let minutesString = new Date(dateObj).getMinutes();
    let secondsString = new Date(dateObj).getSeconds();
    hoursString = hoursString < 10 ? '0' + hoursString : hoursString
    minutesString = minutesString < 10 ? '0' + minutesString : minutesString
    secondsString = secondsString < 10 ? '0' + secondsString : secondsString

    timeString += hoursString + ':' + minutesString + ':' + secondsString
    return timeString;
};

</script>



<style lang="scss" scoped>



</style>
