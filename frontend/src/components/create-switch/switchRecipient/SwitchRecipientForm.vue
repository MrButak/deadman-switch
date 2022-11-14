<template>
    
    <va-form class="signup-form">
        
        <p style="padding: 0 1rem .4rem 1rem;">Who should receive your message in case you don't make it home for supper?</p>
        <va-input
            v-model="newSwitchData.recipientFirstName"
            type="text"
            label="Recipient first name"
            class="form-input mr-4 mb-4"
            :rules="[value => (value && regexName.test(value)) || 'Field is required']"
        />
        <va-input
            v-model="newSwitchData.recipientLastName"
            type="text"
            label="Recipient last name"
            class="form-input mr-4 mb-4"
            :rules="[value => (value && regexName.test(value)) || 'Field is required']"
        />
        <va-input
            v-model="newSwitchData.recipientEmail"
            type="email"
            label="Recipient email"
            class="form-input mr-4 mb-4"
            :rules="[value => (value && regexEmail.test(value)) || 'Field is required']"
        /> 
    </va-form>

</template>



<script setup>

import { newSwitchData } from '../../../../javascripts/stateManager';

let regexName = /^([A-Za-z]){1,18}$/;
let regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

function areFormFieldsValid() {
    
    if( regexName.test(userSignupData.firstName) &&
        regexName.test(userSignupData.lastName) &&
        regexEmail.test(userSignupData.emailAddress) &&
        passwordsMatch.value) 
            { return true }

    return false;
};

async function handleFormSubmission() {

    // Form validation
    if(!areFormFieldsValid()) { return };

    // Remove error message (if any)
    errorMessage.value = '';
}

</script>



<style lang="scss" scoped>

.signup-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        text-align: center;
        padding: 0 1rem;
        // min-width: var(--va-input-wrapper-min-width);
    }
}

</style>
