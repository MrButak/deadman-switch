<template>

<div class="card-wrapper">
    <div class="flex md6 lg4">
        <va-card stripe stripe-color="success">
        <va-card-title class="switch-name">{{ switchName }}</va-card-title>
        <va-card-content>
            <div class="check-in-button-wrapper">
                
                <va-button 
                    class="mr-4 mb-2 check-in-button"
                    color="info"
                    
                    >
                    <h6 class="va-h6">Check In</h6>
                </va-button>
                
            </div>
            
            <CountdownTimer 
                :seconds-before-switch-flipped-prop="secondsBeforeNewSwitchFlippedProp"
                timer-sub-text="Before you must checkin"
            />
        </va-card-content>
        </va-card>
    </div>
</div>


</template>



<script setup>


import CountdownTimer from '../shared/CountdownTimer.vue';

defineProps({
    secondsBeforeNewSwitchFlippedProp: Number,
    switchName: String
});

// check_in_by_time
// : 
// "2022-11-15T15:31:37.542Z"
// check_in_interval_in_hours
// : 
// 24
// created_at
// : 
// "2022-11-15T15:31:47.590Z"
// final_message
// : 
// "Hi ma, I won't be making it home for supper tonight. You know what to do."
// id
// : 
// 21
// last_checked_in_at
// : 
// "2022-11-14T15:31:37.542Z"
// recipient_email
// : 
// "sdfsd@dsfs.com"
// recipient_first_name
// : 
// "dd"
// recipient_last_name
// : 
// "df"
// triggered
// : 
// false
// user_id
// : 
// 1


</script>



<style lang="scss" scoped>

.card-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
}
.switch-name {
    justify-content: center;
    width: 100%;
    text-align: center;
}
.check-in-button-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0 0 1rem 0;
}
.check-in-button {

    width: 6rem;
    height: 6rem;
    border-radius: 50%;
}
</style>