<template>

<CreateSwitchReview />
<CountdownTimer 
    seconds-before-switch-flipped-prop="100000"
    timer-sub-text="Before you must checkin"
/>
<AcknowledgeFirstCheckIn />
<CreateSwitchReviewErrorMessages />
<CreateSwitchButton />

</template>



<script setup>

import AcknowledgeFirstCheckIn from './AcknowledgeFirstCheckIn.vue';
import CreateSwitchButton from './CreateSwitchButton.vue';
import CreateSwitchReview from './CreateSwitchReview.vue';
import CountdownTimer from '../../shared/CountdownTimer.vue';
import CreateSwitchReviewErrorMessages from './createSwitchReviewErrorMessages.vue';

</script>




<style lang="scss" scoped>



</style>
