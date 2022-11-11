<template>

<Header />

<span v-if="userLoggedIn">
    <Home />
</span>

<span v-else>

    <span v-if="showLogin">
        <Login />
    </span>
    <span v-else-if="!hasRegistered && showSignup">
        <Signup />
    </span>

</span>


</template>


<script setup>

import { onMounted } from 'vue';
import { checkForValidCookie } from '../javascripts/userManager';
import { userLoggedIn, showLogin, showSignup, hasRegistered } from '../javascripts/stateManager';
import Header from './components/global/Header.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Home from './views/Home.vue';

// On app mount check if the user is logged in and determine which Components to show or not
onMounted(() => {

    (async() => {
        await checkIfUserIsLoggedIn();
    })();
});


async function checkIfUserIsLoggedIn() {

    let userIsLoggedIn = await checkForValidCookie();
    if(!userIsLoggedIn) {
        showLogin.value = true;
        showSignup.value = false;
        userLoggedIn.value = false;
    }
    else {
        showLogin.value = false;
        showSignup.value = false;
        userLoggedIn.value = true;
    }
};

</script>



<style scoped>



</style>
