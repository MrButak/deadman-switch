<template>

<div style="position: relative; padding: 0 0 1rem 0;">
    <va-app-bar>
        <va-button @click="createSwitchStore.showCreateDeadmanSwitchCreationView = false, loginSignupStore.showUserAccount = false" 
            icon="home" 
            color="#fff" 
            preset="plain" />
        <va-button 
            @click="showModal = !showModal" 
            icon="info" 
            color="#fff" 
            preset="plain" />
        <va-spacer />

        <!-- Light/dark theme -->
        <va-button-toggle v-model="theme" :options="themeOptions" class="ml-2" />

        <span v-if="!loginSignupStore.userLoggedIn && !loginSignupStore.hasRegistered" style="padding-right: 10px;" >
            <va-button @click="loginSignupStore.handleSignupView" color="#fff" preset="plain">
                Register
            </va-button>
            <span style="color:#fff; padding:0 5px">/</span>
            <va-button @click="loginSignupStore.handleLoginView" color="#fff" preset="plain">
                Login
            </va-button>
        </span>

        <span v-else-if="loginSignupStore.userLoggedIn">
            <va-button 
                @click="createSwitchStore.showCreateDeadmanSwitchCreationView = true, loginSignupStore.showUserAccount = false" 
                icon="add_circle" 
                color="#fff" 
                preset="plain" />
                
            <va-button 
                @click="loginSignupStore.showUserAccount = true, createSwitchStore.showCreateDeadmanSwitchCreationView = false"
                icon="account_circle" 
                color="#fff" 
                preset="plain" />
        </span>
        
    </va-app-bar>
  </div>

  <!-- About icon popup modal -->
  <va-modal
    v-model="showModal"
    :message="infoMessage"
    blur
  />

</template>



<script setup>

import { ref, watchEffect } from 'vue';
import { useColors } from 'vuestic-ui';

// Pinia store
import { useCreateSwitchStore, useLoginSignupStore } from '../../javascript/stateManager';
const createSwitchStore = useCreateSwitchStore();
const loginSignupStore = useLoginSignupStore();

// Vuestic Component library color theme and header switch
const { presets, applyPreset } = useColors()
let theme = ref(localStorage.getItem('vuestic-docs-theme')?.toLowerCase() || 'dark');
let themeOptions = Object.keys(presets.value).map((themeName) => ({
    value: themeName,
    label: themeName
}));
watchEffect(() => {
    applyPreset(theme.value)
});

let showModal = ref(false);
let infoMessage = 'Deadman switch is an app to help people help those who care about them know they are ok.';

</script>
