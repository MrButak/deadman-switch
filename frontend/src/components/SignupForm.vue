<template>

<va-form class="signup-form">
    <h2 class="va-h3">Register</h2>
    <va-input
      v-model="userSignupData.firstName"
      type="text"
      label="First name"
      class="form-input mr-4 mb-4"
      :rules="[value => (value && regexName.test(value)) || 'Field is required']"
    />
    <va-input
      v-model="userSignupData.lastName"
      type="text"
      label="Last name"
      class="form-input mr-4 mb-4"
      :rules="[value => (value && regexName.test(value)) || 'Field is required']"
    />
    <va-input
      v-model="userSignupData.emailAddress"
      type="email"
      label="Email"
      class="form-input mr-4 mb-4"
      :rules="[value => (value && regexEmail.test(value)) || 'Field is required']"
    />
    <va-input
      v-model="userSignupData.password"
      minlength="6"
      maxlength="18"
      :type="isPasswordVisible ? 'text' : 'password'"
      label="Password"
      class="form-input mr-4 mb-4"
      :rules="[value => (value && regexPassword.test(value)) || 'Field is required']"
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
    <va-input
      v-model="userSignupData.retypePassword"
      :type="isPasswordVisible ? 'text' : 'password'"
      label="Retype password"
      class="form-input mr-4 mb-4"
      :rules="[value => (value && regexPassword.test(value)) || 'Field is required']"
    />
    <va-button
        @click.prevent="handleFormSubmission"
        :disabled="!areFormFieldsValid()"
    > Register </va-button>
    <p>
        Already have an account? <span class="va-link">Login</span>
    </p>
</va-form>

</template>



<script setup>

import { ref, reactive, computed } from 'vue';

let isPasswordVisible = ref(false);
let userSignupData = reactive({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    retypePassword: ''
});

let passwordsMatch = computed(() => {
    return userSignupData.password == userSignupData.retypePassword;
});

let regexName = /^([A-Za-z]){1,18}$/;
let regexPassword = /^([A-Za-z0-9\-\_\!\@\#\$\%\^\&\*\+\=]){6,18}$/;
let regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

function areFormFieldsValid() {
    
    if( regexName.test(userSignupData.firstName) &&
        regexName.test(userSignupData.lastName) &&
        regexEmail.test(userSignupData.emailAddress) &&
        regexPassword.test(userSignupData.password) &&
        passwordsMatch.value) 
            { return true }

    return false;
};

async function handleFormSubmission() {

    // Form validation
    if(!areFormFieldsValid()) { return };

    // Backend request
    let request = await fetch(`${import.meta.env.VITE_BASE_URL}api/register`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
            firstName: userSignupData.firstName,
            lastName: userSignupData.lastName,
            email: userSignupData.emailAddress,
            password: userSignupData.password
        })
    });

    let response = await request.json();

    switch(response.status) {
        case '400':
            break;
        case '500':
            break;
        
    }

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
