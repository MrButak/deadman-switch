<template>

<div style="position: relative;">
    <va-app-bar>
        <va-button icon="home" color="#fff" preset="plain" />
        <va-button @click="showModal = !showModal" icon="info" color="#fff" preset="plain" />
        <va-spacer />


        <va-button-toggle v-model="theme" :options="themeOptions" class="ml-2" />
        <!-- <va-switch v-model="theme" :options="themeOptions" color="warning" class="mr-4" /> -->


        <span v-if="!userLoggedIn && !hasRegistered" style="padding-right: 10px;" >
            <va-button @click="handleSignupView" color="#fff" preset="plain">
                Register
            </va-button>
            <span style="color:#fff; padding:0 5px">/</span>
            <va-button @click="handleLoginView" color="#fff" preset="plain">
                Login
            </va-button>
        </span>

        <span v-else-if="userLoggedIn">
            <va-button icon="add_circle" color="#fff" preset="plain" />
            <va-button icon="account_circle" color="#fff" preset="plain" />
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

import { userLoggedIn, hasRegistered } from '../../../javascripts/stateManager';
import { handleLoginView, handleSignupView } from '../../../javascripts/viewManager';

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
