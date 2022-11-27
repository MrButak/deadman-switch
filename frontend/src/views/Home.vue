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

import NoSwitches from '../components/home/NoSwitches.vue';
import CreateSwitch from '../components/home/CreateSwitch.vue';
import AllSwitches from '../components/home/AllSwitches.vue';

// Pinia store
import { storeToRefs } from 'pinia';
import { useDeadmanSwitchStore, useCreateSwitchStore } from '../javascript/stateManager';
let deadmanSwitchStore = useDeadmanSwitchStore();
let createSwitchStore = useCreateSwitchStore();
const { deadmanSwitches } = deadmanSwitchStore;
const { showCreateDeadmanSwitchCreationView } = storeToRefs(createSwitchStore);

</script>



<style lang="scss" scoped>



</style>
