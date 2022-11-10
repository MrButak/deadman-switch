<template>

<Header />
<SignupForm />
<LoginForm />

</template>


<script setup>

import LoginForm from './components/LoginForm.vue';
import SignupForm from './components/SignupForm.vue';
import Header from './components/global/Header.vue';
import { checkForValidCookie } from '../javascripts/userManager';

(async() => {

    await checkForValidCookie()
    
})();

</script>



<style scoped>



</style>
