<template>

<span v-if="!deadmanSwitches.length && !showCreateDeadmanSwitch">
    <NoSwitches />
</span>
<span v-if="showCreateDeadmanSwitch">
    <CreateSwitch />
</span>

</template>



<script setup>

import { deadmanSwitches,
        showCreateDeadmanSwitch
} from '../../javascripts/stateManager';
import NoSwitches from '../components/home/NoSwitches.vue';
import CreateSwitch from '../components/home/CreateSwitch.vue';

</script>



<style lang="scss" scoped>



</style>
