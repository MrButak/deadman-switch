<template>
    
<h2 class="va-h2" style="text-align: center;">Your Switches</h2>
<span v-for="dmSwitch in deadmanSwitches">
    <DeadmanSwitch
        :seconds-before-new-switch-flipped-prop="secondsBeforeSwitchExpires(dmSwitch.check_in_by_time, dmSwitch.check_in_interval_in_hours, dmSwitch.last_checked_in_at)"
        :switch-name="dmSwitch.switch_name"
        :check-in-by-info-text="`Check in by : ${extractTimeFromDateObject(dmSwitch.check_in_by_time)} every ${dmSwitch.check_in_interval_in_hours / 24} day(s)`"
        :switch-color="determineSwitchColor(secondsBeforeSwitchExpires(dmSwitch.check_in_by_time, dmSwitch.check_in_interval_in_hours, dmSwitch.last_checked_in_at))"
        :switch-button-text="determineSwitchButtonText(secondsBeforeSwitchExpires(dmSwitch.check_in_by_time, dmSwitch.check_in_interval_in_hours, dmSwitch.last_checked_in_at))"
        @handle-check-in="handleCheckIn(dmSwitch.id, dmSwitch.check_in_by_time, dmSwitch.check_in_interval_in_hours, dmSwitch.last_checked_in_at)"
        :last-checked-in="new Date(dmSwitch.last_checked_in_at).toLocaleString()"
    />
</span>
    
</template>



<script setup>

import { deadmanSwitches } from '../../javascript/stateManager';
import DeadmanSwitch from '../deadman-switch/DeadmanSwitch.vue';

function handleCheckIn(switchId, checkInByTimestamp, checkInIntervalInHours, lastCheckedInAtTimestamp) {
    
    // When a check in happens 
    // checkInTimeToday + checkInInterval = newCheckInTime
    let newCheckInTime = secondsSinceEpochToCheckInTimeToday + (checkInIntervalInHours * 60 * 60)
    // Recalculate seconds left
    let secondsUntilSwitchFlipped = (checkInTimeToday.getTime() / 1000) - (new Date(Date.now()).getTime() / 1000);
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
function secondsBeforeSwitchExpires(checkInBy, checkInIntervalInHours, lastCheckedIn) {

    console.log( new Date(checkInBy).toLocaleString() )
    console.log('check in by')
    console.log( checkInIntervalInHours )
    console.log('interval in hours')
    console.log( new Date(lastCheckedIn).toLocaleString() )
    console.log('last checked in')

    // *********************************************************************************
    // Calculate seconds until switch Expires
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

    

    let secondsSinceEpochToCheckInTimeToday = checkInTimeToday.getTime() / 1000;
    let secondsSinceEpochToLastCheckInTime = new Date(lastCheckedIn).getTime() / 1000;
    
    
    let checkInIntervalInSeconds = checkInIntervalInHours * 60 * 60;
    let secondsElapsedSinceLastCheckIn = (new Date(Date.now()).getTime() / 1000) - secondsSinceEpochToLastCheckInTime;
    
    let secondsUntilSwitchFlipped = checkInIntervalInSeconds - secondsElapsedSinceLastCheckIn;

    if(secondsUntilSwitchFlipped < 0) { return 0 };
    return secondsUntilSwitchFlipped;

    
};

</script>



<style lang="scss" scoped>



</style>
