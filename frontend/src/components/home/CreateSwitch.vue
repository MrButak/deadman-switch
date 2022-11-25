<template>

<CreateSwitchNavigation />

<span v-if="creatSwitchCurrentView == 'Settings'">
    <SwitchSettings />
</span>

<span v-else-if="creatSwitchCurrentView == 'Recipient'">
    <SwitchRecipient />
</span>

<span v-else-if="creatSwitchCurrentView == 'Review'">
    <CreateSwitchView />
</span>

</template>



<script setup>

import CreateSwitchNavigation from '../create-switch/CreateSwitchNavigation.vue';
import SwitchRecipient from '../create-switch/switchRecipient/SwitchRecipient.vue';
import SwitchSettings from '../../components/create-switch/switchSettings/SwitchSettings.vue';
import CreateSwitchView from '../create-switch/createSwitchReviewAndCreate/CreateSwitchView.vue';

// Pinia stores
import { storeToRefs } from 'pinia'
import { useCreateSwitchStore } from '../../javascript/stateManager';
import { onMounted } from 'vue';
let createSwitchStore = useCreateSwitchStore();
const { creatSwitchCurrentView } = storeToRefs(createSwitchStore);


// Default view
onMounted(() => {
    creatSwitchCurrentView.value = 'Settings'
});

</script>



<style lang="scss" scoped>




</style>
