<template>

    <va-form class="signup-form">
        <va-input
            v-model="userLoginData.emailAddress"
            type="email"
            label="Email"
            class="form-input mr-4 mb-4"
        />
        <va-input
            v-model="userLoginData.password"
            minlength="6"
            maxlength="18"
            :type="isPasswordVisible ? 'text' : 'password'"
            label="Password"
            class="form-input mr-4 mb-4"
        >
        <template #appendInner>
            <va-icon
            :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
            size="small"
            color="--va-primary"
            @click="isPasswordVisible = !isPasswordVisible"
            />
        </template>
        </va-input>
        
        <va-button
            @click.prevent="handleLogin"
            :disabled="!areFormFieldsValid()"
        > Login </va-button>
        <p>
            Not regestered yet? 
            <span @click="handleSignupView()" class="va-link">
                Register
            </span>
        </p>
        <!-- Error message -->
        <va-alert v-if="errorMessage" color="danger" class="mb-4">
            {{ errorMessage }}
        </va-alert>
    </va-form>

</template>
    
    
    
<script setup>

import { ref, reactive } from 'vue';
import { handleSignupView } from '../../javascripts/ViewManager'

let errorMessage = ref('');
let isPasswordVisible = ref(false);
let userLoginData = reactive({
    emailAddress: '',
    password: ''
});

let regexPassword = /^([A-Za-z0-9\-\_\!\@\#\$\%\^\&\*\+\=]){6,18}$/;
let regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

function areFormFieldsValid() {
    
    if( regexEmail.test(userLoginData.emailAddress) &&
        regexPassword.test(userLoginData.password)) 
            { return true }

    return false;
};

async function handleLogin() {

    // Form validation
    if(!areFormFieldsValid()) { return };

    // Remove error message (if any)
    errorMessage.value = '';

    // Backend request
     let request = await fetch(`${import.meta.env.VITE_BASE_URL}api/login`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
            email: userLoginData.emailAddress,
            password: userLoginData.password
        })
    });

    // Parse response
    let response = await request.json();

    switch(response.status) {
        case '400':
            errorMessage.value = response.message;
            break;
        case '500':
            errorMessage.value = response.message;
            break;
            // 200 success
        // default:
    };

};

</script>



<style lang="scss" scoped>

@import '../../styles/variables.scss';

.signup-form {
    
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        padding: .6rem 0 0 0;
    }
}

</style>
    