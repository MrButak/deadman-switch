<template>
    
<h2 class="va-h2" style="text-align: center;">
    Your Switches
</h2>

<!-- Deadman switches -->
<span v-for="dmSwitch in deadmanSwitches">
    <DeadmanSwitch
        :dm-switch="dmSwitch"
    /> 
</span>



</template>



<script setup>

import { deadmanSwitches, showSwitchInfoModal, showFinalMessageModal, currentlyViewedSwitch } from '../../javascript/stateManager';
import { secondsBeforeSwitchExpires } from '../../javascript/switchManager';
import { extractTimeFromDateObject } from '../../javascript/utils';
import DeadmanSwitchInfoModal from '../deadman-switch/DeadmanSwitchInfoModal.vue';
import DeadmanSwitch from '../deadman-switch/DeadmanSwitch.vue';

</script>



<style lang="scss" scoped>



</style>
