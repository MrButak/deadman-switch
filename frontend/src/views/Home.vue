<template>

<span v-if="!deadmanSwitches.length && !showCreateDeadmanSwitchCreationView">
    <NoSwitches />
</span>

<span v-if="showCreateDeadmanSwitchCreationView">
    <CreateSwitch />
</span>

<span v-if="!showCreateDeadmanSwitchCreationView">
    <AllSwitches />
</span>

</template>



<script setup>

import {
    //  deadmanSwitches,
        showCreateDeadmanSwitchCreationView
} from '../javascript/stateManager';
import NoSwitches from '../components/home/NoSwitches.vue';
import CreateSwitch from '../components/home/CreateSwitch.vue';
import AllSwitches from '../components/home/AllSwitches.vue';

// Pinia store
import { useDeadmanSwitchStore } from '../javascript/stateManager';
let deadmanSwitchStore = useDeadmanSwitchStore();
const { deadmanSwitches } = deadmanSwitchStore;

</script>



<style lang="scss" scoped>



</style>
