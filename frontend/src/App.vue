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
import { getDeadmanSwitchesWithUserId } from './javascript/deadmanManager';
import { checkForValidCookieAndGetUserId } from './javascript/userManager';
import { userLoggedIn, showLogin, showSignup, hasRegistered,
        deadmanSwitches
} from './javascript/stateManager';
import Header from './components/header/Header.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Home from './views/Home.vue';

// On app mount check if the user is logged in and determine which Components to show or not
onMounted(() => {

    (async() => {
        let isUserLoggedIn = await checkIfUserIsLoggedIn();
        console.log({isUserLoggedIn})
        if (isUserLoggedIn[0]) {

            let switches = await getDeadmanSwitchesWithUserId(isUserLoggedIn[1]);
            console.log(switches)
            if(switches) {
                // TODO: push switches into State Array
                // Create a component to show the switches
            };
            // TODO: Backend call to get switches and user data
            // *Separate the logic. don't get user data until they click on their account icon*

        };
    })();
});


async function checkIfUserIsLoggedIn() {

    let userId = await checkForValidCookieAndGetUserId();

    if(!userId[0]) {
        showLogin.value = true;
        showSignup.value = false;
        userLoggedIn.value = false;
        return [false];
    }
    else {
        showLogin.value = false;
        showSignup.value = false;
        userLoggedIn.value = true;
        return [true, userId[1]];
    };
};

</script>



<style scoped>



</style>
