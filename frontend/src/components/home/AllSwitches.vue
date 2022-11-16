<template>
    
<h2 class="va-h2" style="text-align: center;">Your Switches</h2>
<span v-for="dmSwitch in deadmanSwitches">
    <DeadmanSwitch 
        :seconds-before-new-switch-flipped-prop="secondsBeforeSwitchExpires(dmSwitch.check_in_by_time, dmSwitch.check_in_interval_in_hours, dmSwitch.last_checked_in_at)"
        switch-name="Switch name"
        :switch-color="determineSwitchColor(secondsBeforeSwitchExpires(dmSwitch.check_in_by_time, dmSwitch.check_in_interval_in_hours, dmSwitch.last_checked_in_at))"
        :switch-button-text="determineSwitchButtonText(secondsBeforeSwitchExpires(dmSwitch.check_in_by_time, dmSwitch.check_in_interval_in_hours, dmSwitch.last_checked_in_at))"
        @handle-check-in="handleCheckIn(dmSwitch.id, dmSwitch.check_in_by_time, dmSwitch.check_in_interval_in_hours, dmSwitch.last_checked_in_at)"
    />
</span>
    
</template>



<script setup>

import { deadmanSwitches } from '../../javascript/stateManager';
import DeadmanSwitch from '../deadman-switch/DeadmanSwitch.vue';

function handleCheckIn(switchId, checkInByTimestamp, checkInIntervalInHours, lastCheckedInAtTimestamp) {
    console.log({switchId})
    console.log('making it to prop function')
};

function determineSwitchColor(timeLeftInSeconds) {

    if(timeLeftInSeconds < 14440) { // 4 hours
        return 'danger'
    };
    return 'info';
};

function determineSwitchButtonText(timeLeftInSeconds) {
    console.log({timeLeftInSeconds})
    if(timeLeftInSeconds <= 0) { // 4 hours
        return 'Dead'
    };

    return 'Check In'
};

// Function calculates the seconds before the user needs to check in
function secondsBeforeSwitchExpires(checkInBy, checkInIntervalInHours, lastCheckedIn) {

    console.log( new Date(checkInBy).toLocaleString() )
    console.log('check in by')
    console.log( checkInIntervalInHours )
    console.log('interval in hours')
    console.log( new Date(lastCheckedIn).toLocaleString() )
    console.log('last checked in')

    // *********************************************************************************
    // Calculate econds until switch Expires
    // *********************************************************************************

    // Date Object representing todays Date at the checkInTime
    let checkInByHours = new Date(checkInBy).getUTCHours();
    let checkInByMinutes = new Date(checkInBy).getUTCMinutes();
    let checkInBySeconds = new Date(checkInBy).getUTCSeconds();
    let checkInByMilliseconds = new Date(checkInBy).getUTCMilliseconds();
    let checkInTimeToday = new Date(Date.now());
    checkInTimeToday.setUTCHours(checkInByHours);
    checkInTimeToday.setUTCMinutes(checkInByMinutes);
    checkInTimeToday.setUTCSeconds(checkInBySeconds);
    checkInTimeToday.setUTCMilliseconds(checkInByMilliseconds);

    // checkInTimeToday - lastCheckedIn + checkInInterval

    let secondsSinceEpochToCheckInTimeToday = checkInTimeToday.getTime() / 1000;
    let secondsSinceEpochToLastCheckInTime = new Date(lastCheckedIn).getTime() / 1000;
    
    // let secondsSinceEpochToNow = new Date(Date.now()).getTime() / 1000;
    // let secondsUntilSwitchFlipped = secondsSinceEpochToCheckInTimeToday - secondsSinceEpochToLastCheckInTime;
    let secondsUntilSwitchFlipped = (checkInTimeToday.getTime() / 1000) - (new Date(Date.now()).getTime() / 1000);
    
    // Check for expired switch
    // if checkInTimeNow - lastCheckInTime > checkInInterval == expired
    // let checkInIntervalInSeconds = checkInByHours * 60 * 60;
    // let secondsSinchEpochToLastCheckedInInSeconds = new Date(lastCheckedIn).getTime() / 1000;
    if(secondsUntilSwitchFlipped < 0) { return 0 };
    return secondsUntilSwitchFlipped;

    // When a check in happens 
    // checkInTimeToday + checkInInterval = newCheckInTime
    // let newCheckInTime = secondsSinceEpochToCheckInTimeToday + (checkInIntervalInHours * 60 * 60)
    // Recalculate seconds left
    // let secondsUntilSwitchFlipped = (checkInTimeToday.getTime() / 1000) - (new Date(Date.now()).getTime() / 1000);
};
// check_in_by_time
// : 
// "2022-11-15T15:22:39.591Z"
// check_in_interval_in_hours
// : 
// 24
// created_at
// : 
// "2022-11-15T15:17:10.495Z"
// final_message
// : 
// "Hi ma, I won't be making it home for supper tonight. You know what to do."
// id
// : 
// 10
// last_checked_in_at
// : 
// "2022-11-14T15:22:39.591Z"
// recipient_email
// : 
// "dsf@dsf.com"
// recipient_first_name
// : 
// "dsf"
// recipient_last_name
// : 
// "dsf"
// triggered
// : 
// false
// user_id
// : 
// 1
</script>



<style lang="scss" scoped>



</style>
