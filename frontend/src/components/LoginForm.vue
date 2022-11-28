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

        <div v-if="errorMessage" class="va-title" style="color: var(--va-danger); width: 300px; text-align: center;">{{ errorMessage }}</div>

        <va-button style="margin: 10px 0;"
            @click.prevent="handleLogin"
            :disabled="!areFormFieldsValid()"
        > Login </va-button>
        <p v-if="!loginSignupStore.hasRegistered">
            Not regestered yet? 
            <span @click="loginSignupStore.handleSignupView()" class="va-link">
                Register
            </span>
        </p>
    </va-form>
<p>testing login</p>
<p>email: test@test.com</p>
<p>password: password</p>
</template>
    
    
    
<script setup>

import { ref, reactive } from 'vue';
import { useLoginSignupStore, useErrorMessageStore,
    regexPassword, regexEmail
} from '../javascript/stateManager';

// Pinia store
const loginSignupStore = useLoginSignupStore();
const errorMessageStore = useErrorMessageStore();

let errorMessage = ref('');
let isPasswordVisible = ref(false);
let userLoginData = reactive({
    emailAddress: '',
    password: ''
});

function areFormFieldsValid() {
    if(
        regexEmail.test(userLoginData.emailAddress) &&
        regexPassword.test(userLoginData.password)
    ) 
        { return true }
    return false;
};

async function handleLogin() {

    // Form validation
    if(!areFormFieldsValid()) { return };

    // Remove error message (if any)
    errorMessage.value = '';

    // Backend request
     let request = await fetch(`${import.meta.env.VITE_BASE_URL}api/user/login`, {
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
        case '200':
            // Handle views
            loginSignupStore.errorMessage = '';
            loginSignupStore.hasRegistered = false;
            loginSignupStore.showLogin = false;
            loginSignupStore.showSignup = false;
            loginSignupStore.loginFailedEmailNotVerified = false;
            loginSignupStore.userLoggedIn = true;
            // Reset the State (clear out any error messages)
            errorMessageStore.$reset();
            break;
        case '500':
            errorMessage.value = response.message;
            break;
        case '401': // Email not verified
            errorMessage.value = response.message;
            errorMessageStore.checkForErrors({type: 'mustVerifyEmail', data: false})
            loginSignupStore.loginFailedEmailNotVerified = true;
            // TODO: show an option to resend email
            break;
        case '400':
            errorMessage.value = response.message;
            break;
        default:
            console.log('unhandled response case', response);
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
        // padding: .6rem 0 0 0;
    }
}

</style>
    