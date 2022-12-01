<template>

    <!-- Switch info modal -->
    <va-modal
        v-model="showSwitchSettingsModal"
        no-padding
        blurred
    >
        <template #content="{ ok }">
    
        <va-card-actions align="between">
            <p style="padding: 0 6rem 0 0">Settings</p>
            <p style="padding: 0 0 0 6rem" class="va-text-success">a</p>
        </va-card-actions>
        <va-card-actions align="between">
            <p style="padding: 0 2rem 0 0">a</p>
            <p style="padding: 0 0 0 2rem" class="va-text-success">a</p>
        </va-card-actions>
        <va-card-actions align="between">
            <p style="padding: 0 2rem 0 0">a</p>
            <p style="padding: 0 0 0 2rem" class="va-text-success">a</p>
        </va-card-actions>
        <va-card-actions align="between">
            <p style="padding: 0 2rem 0 0">a</p>
            <p style="padding: 0 0 0 2rem" class="va-text-success">a</p>
        </va-card-actions>
        <va-card-actions align="between">
            <p style="padding: 0 2rem 0 0">a</p>
            <p style="padding: 0 0 0 2rem" class="va-text-success">a</p>
        </va-card-actions>
        <va-card-actions align="between">
            <p style="padding: 0 2rem 0 0">a</p>
            <p style="padding: 0 0 0 2rem" class="va-text-success">a</p>
        </va-card-actions>
    
        
        </template>
    </va-modal>
    
    <!-- Final message popup modal -->
    <!-- <va-modal
        v-model="showFinalMessageModal"
        @click="showFinalMessageModal = false"
        title="Final message"
        :message="currentlyViewedSwitch.final_message"
        fixed-layout
    /> -->

    
    
    </template>
    
    
    
    <script setup>
    
    import { ref } from 'vue';
    // Pinia stores
    import { storeToRefs } from 'pinia'
    import {useDeadmanSwitchStore} from '../../../javascript/stateManager';
    let deadmanSwitchStore = useDeadmanSwitchStore();
    const { showSwitchSettingsModal } = storeToRefs(deadmanSwitchStore);
    
    // let showOptionsModal = ref(false);
    
    </script>
    
    
    
    <style lang="scss">
    
    
    
    </style>
    