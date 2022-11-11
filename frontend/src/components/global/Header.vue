<template>

<div style="position: relative;">
    <va-app-bar>
        <va-button icon="home" color="#fff" preset="plain" />
        <va-button icon="info" color="#fff" preset="plain" />
        <va-spacer />

        <span v-if="!userLoggedIn" style="padding-right: 10px;" >
            <va-button @click="handleSignupView" color="#fff" preset="plain">
                Register
            </va-button>
            <span style="color:#fff; padding:0 5px">/</span>
            <va-button @click="handleLoginView" color="#fff" preset="plain">
                Login
            </va-button>
        </span>

        <span v-else>
            <va-button icon="settings" color="#fff" preset="plain" />
            <va-button icon="account_circle" color="#fff" preset="plain" />
        </span>
        
    </va-app-bar>
  </div>


</template>

<script setup>

import { userLoggedIn, showLogin, showSignup } from '../../../javascripts/stateManager';
import { handleLoginView, handleSignupView } from '../../../javascripts/ViewManager';

</script>
