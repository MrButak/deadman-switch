<template>

<h2 class="va-h3 va-text-center" style="padding: 8px 0">Login</h2>

<LoginForm />

<!-- After a successful registration, the user is taken to the login page which display these messages -->
<!-- <span v-if="hasRegistered">
    <RegisterSuccessMessages />
</span> -->
<ErrorMessages />

</template>



<script setup>

import LoginForm from '../components/LoginForm.vue';
import RegisterSuccessMessages from '../components/RegisterSuccessMessages.vue';
import ErrorMessages from '../components/shared/ErrorMessages.vue';

// Pinia store
import { storeToRefs } from 'pinia';
import { useLoginSignupStore, useErrorMessageStore } from '../javascript/stateManager';
const errorMessageStore = useErrorMessageStore();
const loginSignupStore = useLoginSignupStore();
const {  hasRegistered } = loginSignupStore;


errorMessageStore.checkForErrors([
    { type: 'signupSuccess', data: loginSignupStore.hasRegistered },
]);
</script>



<style lang="scss" scoped>



</style>
