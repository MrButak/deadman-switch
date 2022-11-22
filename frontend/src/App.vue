<template>

<Header />

<span v-if="userLoggedIn">

    <span v-if="showUserAccount">
        <UserAccount />
    </span>

    <span v-else>
        <Home />
    </span>
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
import { getDeadmanSwitchesWithUserId } from './javascript/switchManager';
import { checkForValidCookieAndGetUserId } from './javascript/userManager';
import { userLoggedIn, showLogin, showSignup, hasRegistered,
        deadmanSwitches,
        showUserAccount
} from './javascript/stateManager';
import Header from './components/header/Header.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Home from './views/Home.vue';
import UserAccount from './views/UserAccount.vue';

// On app mount check if the user is logged in and determine what Components to show or not
onMounted(() => {

    (async() => {
        let isUserLoggedIn = await checkIfUserIsLoggedIn();
        
        // Get any switches the user may have
        if (isUserLoggedIn[0]) {

            let switches = await getDeadmanSwitchesWithUserId(isUserLoggedIn[1]);
            
            if(switches) {
                deadmanSwitches.length = 0;
                switches.forEach(dmSwitch => {

                    deadmanSwitches.push(dmSwitch);
                });
            };
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



<style lang="scss">

#app {
    
    overflow: hidden;
}

</style>
