<template>

<Header />

<span v-if="viewStore.showUserAccount">
    <UserAccount />
</span>

<span v-if="viewStore.showHome">
    <Home />
</span>

<span v-if="viewStore.showLogin">
    <Login />
</span>

<span v-if="viewStore.showSignup">
    <Signup />
</span>

</template>


<script setup>

import { onMounted } from 'vue';
import { getDeadmanSwitchesWithUserId } from './javascript/switchManager';
import { checkForValidCookieAndGetUserId } from './javascript/userManager';

import Header from './components/header/Header.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Home from './views/Home.vue';
import UserAccount from './views/UserAccount.vue';

// Pinia stores
import { storeToRefs } from 'pinia';
import { useDeadmanSwitchStore, useLoginSignupStore, useViewStore, useCreateSwitchStore } from './javascript/stateManager';
let createSwitchStore = useCreateSwitchStore()
// console.log(createSwitchStore.checkInByTime)
const deadmanSwitchStore = useDeadmanSwitchStore();
const loginSignupStore = useLoginSignupStore();
const viewStore = useViewStore();

const { deadmanSwitches } = deadmanSwitchStore;
// const { userLoggedIn, showLogin, showSignup, showUserAccount, hasRegistered } = storeToRefs(loginSignupStore);

  
// On app mount check if the user is logged in and determine what Components to show or not
onMounted(() => {
    
    
    (async() => {
        let isUserLoggedIn = await checkIfUserIsLoggedIn();
        
        // If logged in, get any switches the user may have
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

// Function will check users cookie to see if they are logged in and show/hide Components based on that data
async function checkIfUserIsLoggedIn() {

    let userId = await checkForValidCookieAndGetUserId();

    if(!userId[0]) {
        loginSignupStore.showLogin = true;
        loginSignupStore.showSignup = false;
        loginSignupStore.userLoggedIn = false;
        return [false];
    }
    else {
        loginSignupStore.showLogin = false;
        loginSignupStore.showSignup = false;
        loginSignupStore.userLoggedIn = true;
        return [true, userId[1]];
    };
};

</script>



<style lang="scss">

#app {
    overflow: hidden;
}

</style>
