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

import DeadmanSwitch from '../deadman-switch/DeadmanSwitch.vue';
import {useDeadmanSwitchStore} from '../../javascript/stateManager';
let deadmanSwitchStore = useDeadmanSwitchStore();
const { deadmanSwitches } = deadmanSwitchStore;

</script>



<style lang="scss" scoped>



</style>
