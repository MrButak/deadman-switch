<template>

<div class="countdown-timer-wrapper">
    
    <vue-countdown 
        :time="secondsBeforeSwitchFlippedProp * 1000" 
        v-slot="{ days, hours, minutes, seconds }"
    >
        {{ days }} days,
        {{ hours }} hours,
        {{ minutes }} minutes,
        {{ seconds }} seconds.
    </vue-countdown>
    <p>{{ timerSubText }}</p>    
</div>
    
</template>



<script setup>

import VueCountdown from '@chenfengyuan/vue-countdown';

defineProps({
    secondsBeforeSwitchFlippedProp: Number,
    timerSubText: String
});

</script>



<style lang="scss" scoped>


.countdown-timer-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

</style>
