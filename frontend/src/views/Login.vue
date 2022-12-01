<template>

<h2 class="va-h3 va-text-center" style="padding: 8px 0">Login</h2>
<LoginForm />
<ErrorMessages />

</template>



<script setup>

import LoginForm from '../components/LoginForm.vue';
import ErrorMessages from '../components/shared/ErrorMessages.vue';

// Pinia store
import { useLoginSignupStore, useErrorMessageStore } from '../javascript/stateManager';
const errorMessageStore = useErrorMessageStore();
const loginSignupStore = useLoginSignupStore();


errorMessageStore.checkForErrors([
    { type: 'signupSuccess', data: loginSignupStore.hasRegistered },
]);
</script>



<style lang="scss" scoped>



</style>
