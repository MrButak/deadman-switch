<template>
<h2 class="va-h2" style="text-align: center;">Your Account</h2>
<div class="user-account-wrapper row row">
    <div class="flex md6 lg4">
      <va-card>
        <va-card-title>Account information</va-card-title>

        <va-card-actions align="between">
          <p style="padding: 0 2rem 0 0">Email</p>
          <p style="padding: 0 0 0 2rem" class="va-text-success">{{ userAccountData.email }}</p>
        </va-card-actions>

        <va-card-actions align="between">
          <p style="padding: 0 2rem 0 0">First name</p>
          <p style="padding: 0 0 0 2rem" class="va-text-success">{{ userAccountData.firstName }}</p>
        </va-card-actions>

        <va-card-actions align="between">
          <p style="padding: 0 2rem 0 0">Last name</p>
          <p style="padding: 0 0 0 2rem" class="va-text-success">{{ userAccountData.lastName }}</p>
        </va-card-actions>

        <va-card-actions align="between">
          <p style="padding: 0 2rem 0 0">Switches</p>
          <p style="padding: 0 0 0 2rem" class="va-text-success">{{ deadmanSwitches.length }}</p>
        </va-card-actions>

        <va-card-actions align="between">
          <p style="padding: 0 3rem 0 0">Account created at</p>
          <p style="padding: 0 0 0 3rem" class="va-text-success">{{ new Date(userAccountData.creationDate).toLocaleString() }}</p>
        </va-card-actions>
        
    </va-card>
    </div>
</div>

</template>



<script setup>

import { reactive, onMounted } from 'vue';
// import { deadmanSwitches } from '../javascript/stateManager';
import { checkForValidCookieAndGetUserId } from '../javascript/userManager';

// Pinia store
import { useDeadmanSwitchStore } from '../javascript/stateManager';
let deadmanSwitchStore = useDeadmanSwitchStore();
const { deadmanSwitches } = deadmanSwitchStore;

let userAccountData = reactive({
    firstName: '',
    lastName: '',
    email: '',
    creationDate: null
});

onMounted(() => {

    (async() => {
        let userId = await checkForValidCookieAndGetUserId();
        if(userId[0]) {
            await handleFetchUserData(userId[1]);
        };
       
    })();
});

async function handleFetchUserData(userId) {

    let creds = () => { 
        return import.meta.env.VITE_APP_ENVIRONMENT == 'development' ? 'omit' : 'include'
    };

    let request = await fetch(`${import.meta.env.VITE_BASE_URL}api/user/account/${userId}`, {

        credentials: creds(),
        method: 'GET',
        mode: 'cors'
    });

    let response = await request.json();

    switch(response.status) {
        case '200':
            userAccountData.firstName = response.userAccountData.firstName;
            userAccountData.lastName = response.userAccountData.lastName;
            userAccountData.email = response.userAccountData.email;
            userAccountData.creationDate = response.userAccountData.creationDate;
            break;
        case '400':
            break;
        case '500':
            break;
    };
};

</script>



<style lang="scss" scoped>

.user-account-wrapper {
    justify-content: center;
    padding: 0 1rem;
};

</style>
