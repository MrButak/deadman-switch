<template>

<div class="create-switch-buttons">
    <va-button
    color="secondary"
    > 
    Cancel </va-button>
    <va-button @click="handleCreateSwitch"> Create </va-button>
</div>

</template>



<script setup>


import { newSwitchData } from '../../../../javascripts/stateManager';

async function handleCreateSwitch() {

    // TODO: Validation

    let request = await fetch(`${import.meta.env.VITE_BASE_URL}api/switch/create`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
            'newSwitchData': newSwitchData
        })
    });

    // Parse response
    let response = await request.json();

    // switch(response.status) {
    //     case '400':
    //         errorMessage.value = response.message;
    //         break;
    //     case '500':
    //         errorMessage.value = response.message;
    //         break;
    //     // 200 success
    //     default:
    //         showSignup.value = false;
    //         showLogin.value = true;
    //         hasRegistered.value = true;
    // };

};

</script>



<style lang="scss">

.create-switch-buttons {
    display: flex;
    justify-content: center;
    gap: 2rem;
}

</style>
