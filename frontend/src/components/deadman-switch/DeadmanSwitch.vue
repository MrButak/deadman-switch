<template>

<div class="card-wrapper">
    <div class="flex md6 lg4">
        <va-card 
            stripe 
            :stripe-color="switchColor">
        
        <div class="title-and-info-button-wrapper">
            <va-card-title class="switch-name">
                {{ switchName }}
                <span>
                    <va-icon
                        @click="$emit('handleShowSwitchInfoModal')"
                        class="mr-2"
                        name="info"
                        size="medium"
                    />
                </span>
            </va-card-title>
            
        </div>

        <va-card-content>
            <p>{{ checkInByInfoText }}</p>
            <div class="check-in-button-wrapper">
                
                <va-button
                    @click="$emit('handleCheckIn')"
                    border-color="primary"
                    class="mr-4 mb-2 check-in-button"
                    :color="switchColor"
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
                <p>{{ lastCheckedIn }}</p>
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
    switchName: String,
    switchColor: String,
    switchButtonText: String,
    lastCheckedIn: String,
    checkInByInfoText: String,
    switchButtonIcon: String

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
    padding: 0 0 1rem 0;
}
.check-in-button {

    width: 6rem;
    height: 6rem;
    border-radius: 50%;
}

.title-and-info-button-wrapper {
    display: flex;
}
</style>
