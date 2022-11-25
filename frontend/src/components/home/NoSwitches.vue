<template>

<div class="no-switches-wrapper">

<h6 class="va-h6">Create a deadman switch</h6>
<va-icon @click="showCreateDeadmanSwitchCreationView = true"
    class="mr-2"
    name="add_circle"
    size="4rem"
    color="primary"
/>

</div>


</template>



<script setup>

// import { showCreateDeadmanSwitchCreationView } from '../../javascript/stateManager';

// Pinia store
import { storeToRefs } from 'pinia';
import { useCreateSwitchStore } from '../../javascript/stateManager';
const createSwitchStore = useCreateSwitchStore();
const { showCreateDeadmanSwitchCreationView } = storeToRefs(createSwitchStore);

</script>




<style lang="scss" scoped>

.no-switches-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10rem 0 0 0;
    
}

</style>
