<template>
<va-form style="width: 300px;">
    <va-input
      v-model="userSignupData.emailAddress"
      type="text"
      label="First name"
      class="mr-4 mb-4"
      :rules="[value => (value && value.length > 0) || 'Field is required']"
    />
    <va-input
      v-model="userSignupData.emailAddress"
      type="text"
      label="Last name"
      class="mr-4 mb-4"
      :rules="[value => (value && value.length > 0) || 'Field is required']"
    />
    <va-input
      v-model="userSignupData.emailAddress"
      type="email"
      label="Email"
      class="mr-4 mb-4"
      :rules="[value => (value && value.length > 0 && regexEmail.test(value)) || 'Field is required']"
    />
    <va-input
      v-model="userSignupData.retypePassword"
      minlength="6"
      maxlength="18"
      :type="isPasswordVisible ? 'text' : 'password'"
      label="Password"
      class="mr-4 mb-4"
      :rules="[value => (value && value.length > 5 && value.length < 19 && regexPassword.test(value)) || 'Field is required']"
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
      class="mr-4 mb-4"
      :rules="[value => (value && value.length > 0 && regexPassword.test(value)) || 'Field is required']"
    />
    <va-button
        :disabled="!canSubmitForm"
    > Register </va-button>

</va-form>
</template>




<script setup>

import { ref, reactive, computed } from 'vue';

let canSubmitForm = ref(false);
let isPasswordVisible = ref(false);
let userSignupData = reactive({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    retypePassword: ''
})

let regexUsername = /^([A-Za-z0-9\-\_]){3,18}$/;
let regexPassword = /^([A-Za-z0-9\-\_\!\@\#\$\%\^\&\*\+\=]){6,18}$/;
let regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

</script>



<style lang="scss">



</style>
