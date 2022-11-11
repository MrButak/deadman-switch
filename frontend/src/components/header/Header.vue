<template>

<div style="position: relative;">
    <va-app-bar>
        <va-button icon="home" color="#fff" preset="plain" />
        <va-button @click="showModal = !showModal" icon="info" color="#fff" preset="plain" />
        <va-spacer />

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
            <va-button icon="settings" color="#fff" preset="plain" />
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

import { ref } from 'vue';
import { userLoggedIn, hasRegistered } from '../../../javascripts/stateManager';
import { handleLoginView, handleSignupView } from '../../../javascripts/ViewManager';

let showModal = ref(false);
let infoMessage = 'Deadman switch is an app to help people help those who care about them know they are ok.';

</script>
