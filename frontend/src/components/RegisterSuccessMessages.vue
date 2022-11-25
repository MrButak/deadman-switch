<template>

<va-alert color="success" icon="check_circle" class="mb-4" style="width: 80%">
    Registration success
</va-alert>
<va-alert color="warning" icon="info" class="mb-4" style="width: 80%">
    Please check your email and verify your email address - then login
</va-alert>

<!-- Edge case. A reminder to verify email. If the user had a successful registration but login failed because their account is not verified yet. -->
<va-alert v-if="loginFailedEmailNotVerified" color="warning" icon="info" class="mb-4" style="width: 80%">
    Check your email and click on the link to verify your account before logging in
</va-alert>

</template>



<script setup>

// import { loginFailedEmailNotVerified } from '../javascript/stateManager';
// Pinia store
import { storeToRefs } from 'pinia';
import { useLoginSignupStore } from '../javascript/stateManager';
const loginSignupStore = useLoginSignupStore();
const { loginFailedEmailNotVerified } = loginSignupStore;

</script>



<style lang="scss" scoped>



</style>
