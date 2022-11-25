<template>

<h2 class="va-h3 va-text-center" style="padding: 8px 0">Login</h2>

<LoginForm />

<!-- After a successful registration, the user is taken to the login page which display these messages -->
<span v-if="hasRegistered">
    <RegisterSuccessMessages />
</span>

</template>



<script setup>

// import { hasRegistered } from '../javascript/stateManager';
import LoginForm from '../components/LoginForm.vue';
import RegisterSuccessMessages from '../components/RegisterSuccessMessages.vue';

// Pinia store
import { storeToRefs } from 'pinia';
import { useLoginSignupStore } from '../javascript/stateManager';
const loginSignupStore = useLoginSignupStore();
const {  hasRegistered } = loginSignupStore;

</script>



<style lang="scss" scoped>



</style>
