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

import { createSwitchNavigationViews,
        creatSwitchCurrentView
} from '../../../javascript/stateManager';
import CreateSwitchNavigation from '../create-switch/CreateSwitchNavigation.vue';
import SwitchRecipient from '../create-switch/switchRecipient/SwitchRecipient.vue';
import SwitchSettings from '../../components/create-switch/switchSettings/SwitchSettings.vue';
import CreateSwitchView from '../create-switch/createSwitchReviewAndCreate/CreateSwitchView.vue';
</script>



<style lang="scss" scoped>




</style>
