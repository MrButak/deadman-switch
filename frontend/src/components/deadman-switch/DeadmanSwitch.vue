<template>

<div class="card-wrapper">
    <div class="flex md6 lg4">
        
        <va-card 
            stripe 
            :stripe-color="determineSwitchColorTheme">
        
        <div class="title-and-info-button-wrapper">
            <va-card-title class="switch-name">
                {{ switchName }}
                <span>
                    
                    <va-icon
                        @click="assignCurrentlyViewedSwitch(dmSwitch), handleShowSwitchInfoModal()"    
                        class="mr-2"
                        name="info"
                        size="medium"
                    />
                </span>
            </va-card-title>
        </div>

        <span v-if="secondsBeforeSwitchExpires(dmSwitch.check_in_by_timestamp) <= 0" class="expired-message-wrapper">
            <p class="va-text-danger">
                Your switch has expired.
            </p>
        </span>
        
        <va-card-content>
            <div class="check-in-button-wrapper">
                <va-button
                    @click="handleCheckIn(dmSwitch.id, dmSwitch.check_in_by_timestamp, dmSwitch.check_in_interval_in_hours)"    
                    border-color="primary"
                    class="mr-4 mb-2 check-in-button"
                    :color="determineSwitchColorTheme"
                    >
                    <h6>{{ switchButtonText }}</h6>
                        <span>
                            <va-icon
                                class="mr-2"
                                :name="switchButtonIcon"    
                                size="3rem"
                            />
                        </span>
                </va-button>
                <p>Last checked in</p>
                <p>{{ lastCheckedInTimeDate }}</p>
            </div>
            <CountdownTimer 
                :seconds-before-switch-flipped-prop="secondsBeforeSwitchExpires(dmSwitch.check_in_by_timestamp)"
                timer-sub-text="Before you must checkin"
            />
        </va-card-content>
        
        </va-card>
    </div>
</div>

<DeadmanSwitchInfoModal />

</template>



<script setup>

import { computed } from 'vue';
import DeadmanSwitchInfoModal from './DeadmanSwitchInfoModal.vue';
import CountdownTimer from '../shared/CountdownTimer.vue';

import { checkForValidCookieAndGetUserId } from '../../javascript/userManager';

// Pinia stores
import { storeToRefs } from 'pinia'
import {useDeadmanSwitchStore} from '../../javascript/stateManager';
let deadmanSwitchStore = useDeadmanSwitchStore();
const { deadmanSwitches, assignCurrentlyViewedSwitch, handleShowSwitchInfoModal, afterSuccessfulCheckInAssignNewVariablesToSwitch, secondsBeforeSwitchExpires } = deadmanSwitchStore;

// Assign the props to a variable so I will have access to it here in <script>
const props = defineProps({
    dmSwitch: Object
});

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
                // Replace switch variables in State
                afterSuccessfulCheckInAssignNewVariablesToSwitch(deadmanSwitches.findIndex(dmSwitch => dmSwitch.id == response.switch.id), response.switch.check_in_by_timestamp, response.switch.last_checked_in_at)
                break;
            case '500':
                break;
            default:  
        };
};

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
// Switch UI computed properties
// ********************************************************************
let switchButtonIcon = computed(() => {
    return !isButtonLatchOpen(props.dmSwitch.check_in_by_timestamp, props.dmSwitch.check_in_interval_in_hours) && secondsBeforeSwitchExpires(props.dmSwitch.check_in_by_timestamp) > 0 ?
        'done' : // check mark
        '';
});

let switchButtonText = computed(() => {

    if(secondsBeforeSwitchExpires(props.dmSwitch.check_in_by_timestamp) <= 0) {
        return 'Dead'
    }
    else if(isButtonLatchOpen(props.dmSwitch.check_in_by_timestamp, props.dmSwitch.check_in_interval_in_hours) && secondsBeforeSwitchExpires(props.dmSwitch.check_in_by_timestamp) > 0) {
        return 'Check In';
    };
});

let determineSwitchColorTheme = computed(() => {
    let timeLeftInSeconds = secondsBeforeSwitchExpires(props.dmSwitch.check_in_by_timestamp)
    if(timeLeftInSeconds < 3600) { // 1 hour
        return 'danger'; // red
    }
    else if(timeLeftInSeconds < 7200) {
        return 'warning'; // yellow
    }
    else if(!isButtonLatchOpen(props.dmSwitch.check_in_by_timestamp, props.dmSwitch.check_in_interval_in_hours) && timeLeftInSeconds > 0) {
        return 'success'; // green
    };
    return 'info'; // blue
});

let lastCheckedInTimeDate = computed(() => {
    return new Date(props.dmSwitch.last_checked_in_at).toLocaleString()
});

let switchName = computed(() => {
    return props.dmSwitch.switch_name;
});

</script>



<style lang="scss" scoped>

.card-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    p {
        text-align: center;
    }
}
.switch-name {
    justify-content: center;
    width: 100%;
    text-align: center;
}
.check-in-button-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem 0;
}
.check-in-button {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
}
.title-and-info-button-wrapper {
    display: flex;
}
.expired-message-wrapper {
    display: flex;
    justify-content: center;
    p {
        width: 80%
    }
}

</style>
