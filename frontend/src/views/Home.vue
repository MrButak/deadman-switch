<template>

<span v-if="!deadmanSwitches.length && !showCreateDeadmanSwitch">
    <NoSwitches />
</span>

<span v-if="showCreateDeadmanSwitch">
    <CreateSwitch />
</span>

<span v-if="deadmanSwitches.length">
    <AllSwitches />
</span>

</template>



<script setup>

import { deadmanSwitches,
        showCreateDeadmanSwitch
} from '../javascript/stateManager';
import NoSwitches from '../components/home/NoSwitches.vue';
import CreateSwitch from '../components/home/CreateSwitch.vue';
import AllSwitches from '../components/home/AllSwitches.vue';

console.log(deadmanSwitches.length)
console.log('***')

</script>



<style lang="scss" scoped>



</style>
