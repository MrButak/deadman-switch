<template>

<div class="interval-select-wrapper">
    <p>Check in every</p>
    <va-select style="width: 35px;" v-model="newSwitchData.checkInIntervalInDays" :options="[1, 2, 3]" />
    <p>day(s).</p>
</div>

</template>



<script setup>

// Pinia store
import { storeToRefs } from 'pinia';
import { useCreateSwitchStore } from '../../../javascript/stateManager';
const createSwitchStore = useCreateSwitchStore();
const { newSwitchData } = storeToRefs(createSwitchStore);

</script>



<style lang="scss" scoped>

.interval-select-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
