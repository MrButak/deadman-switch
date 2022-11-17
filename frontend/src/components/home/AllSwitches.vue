<template>
    
    <h2 class="va-h2" style="text-align: center;">Your Switches</h2>
    <span v-for="dmSwitch in deadmanSwitches">
        <DeadmanSwitch
            :seconds-before-new-switch-flipped-prop="secondsBeforeSwitchExpires(dmSwitch.check_in_by_time, dmSwitch.check_in_interval_in_hours, dmSwitch.last_checked_in_at)"
            :switch-name="dmSwitch.switch_name"
            :check-in-by-info-text="`Check in by : ${extractTimeFromDateObject(dmSwitch.check_in_by_time)} every ${dmSwitch.check_in_interval_in_hours / 24} day(s)`"
            :switch-color="determineSwitchColor(secondsBeforeSwitchExpires(dmSwitch.check_in_by_time, dmSwitch.check_in_interval_in_hours, dmSwitch.last_checked_in_at), dmSwitch.check_in_interval_in_hours)"
            :switch-button-text="determineSwitchButtonText(secondsBeforeSwitchExpires(dmSwitch.check_in_by_time, dmSwitch.check_in_interval_in_hours, dmSwitch.last_checked_in_at))"
            @handle-check-in="handleCheckIn(dmSwitch.id, dmSwitch.check_in_by_time, dmSwitch.check_in_interval_in_hours, dmSwitch.last_checked_in_at)"
            :last-checked-in="new Date(dmSwitch.last_checked_in_at).toLocaleString()"
        />
</span>
    
</template>



<script setup>

import { deadmanSwitches,

} from '../../javascript/stateManager';
import DeadmanSwitch from '../deadman-switch/DeadmanSwitch.vue';
import { checkForValidCookieAndGetUserId } from '../../javascript/userManager';

function isButtonLatchOpen(checkInByTimestamp, checkInIntervalInHours) {

    // checkInByTime - now < interval ?
    let secondsFromEpochToCheckInByTime = new Date(checkInByTimestamp).getTime() / 1000;
    let secondsFromEpochToNow = new Date(Date.now()).getTime() / 1000;
    console.log((secondsFromEpochToCheckInByTime - secondsFromEpochToNow) < (checkInIntervalInHours * 60 * 60))
    return (secondsFromEpochToCheckInByTime - secondsFromEpochToNow) < (checkInIntervalInHours * 60 * 60);
};


async function handleCheckIn(switchId, checkInByTimestamp, checkInIntervalInHours, lastCheckedInAtTimestamp) {

    if(!isButtonLatchOpen(checkInByTimestamp, checkInIntervalInHours)) { return };
    
    // Make sure user is logged in and get user id
    let userId = await checkForValidCookieAndGetUserId();
    if(!userId[0]) { return }; // not logged in
    if(!userId[1]) { return }; // logged in, but issue with user id
    
    // Extend the switch time by the check in interval    
    let newCheckInTime = new Date(new Date(checkInByTimestamp).setHours(new Date(checkInByTimestamp).getHours() + (checkInIntervalInHours)));
    
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
            // Update switch here
            break;
        case '500':
            break;
        default:  
    };

    console.log({response})
};

function determineSwitchColor(timeLeftInSeconds) {

    if(timeLeftInSeconds < 3600) { // 1 hour
        return 'danger'
    }
    else if(timeLeftInSeconds < 7200) {
        return 'warning'
    }
    return 'info';
};

function determineSwitchButtonText(timeLeftInSeconds, checkInIntervalInHours) {
    
    if(timeLeftInSeconds <= 0) {
        return 'Dead'
    }
    else if(isButtonLatchOpen(timeLeftInSeconds, checkInIntervalInHours) && timeLeftInSeconds > 0) {
        return 'Check In';
    }
    else {
        return 'Already'
    };
};

// Extract just the checkInBytime from the Date Object
function extractTimeFromDateObject(dateObj) {
    
    let timeString = '';
    let hoursString = new Date(dateObj).getHours();
    let minutesString = new Date(dateObj).getMinutes();
    let secondsString = new Date(dateObj).getSeconds();
    let millisecondString = new Date(dateObj).getMilliseconds();
    hoursString = hoursString < 10 ? '0' + hoursString : hoursString
    minutesString = minutesString < 10 ? '0' + minutesString : minutesString
    secondsString = secondsString < 10 ? '0' + secondsString : secondsString

    timeString += hoursString + ':' + minutesString + ':' + secondsString + '.' + millisecondString
    return timeString;
};

// Function calculates the seconds before the user needs to check in
function secondsBeforeSwitchExpires(checkInByTime) {

    // Calculate seconds until switch Expires
    let secondsUntilSwitchFlipped =
        ( (new Date(checkInByTime).getTime() / 1000) - (new Date(Date.now()) ) / 1000);

    // Countdown timer can't take a negative number
    if(secondsUntilSwitchFlipped < 0) { return 0 };

    return secondsUntilSwitchFlipped;    
};

</script>



<style lang="scss" scoped>



</style>
