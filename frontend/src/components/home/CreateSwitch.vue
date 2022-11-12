<template>
<CreateSwitchNavigation />
<va-form class="signup-form">
    <p>Who should receive your message in case you don't make it home for supper?</p>
    <va-icon
        class="mr-2"
        name="person"
        size="2rem"
        color="active"
    />

    <va-input
        v-model="deadmanSwitchData.recipientFirstName"
        type="text"
        label="Recipient first name"
        class="form-input mr-4 mb-4"
        :rules="[value => (value && regexName.test(value)) || 'Field is required']"
    />
    <va-input
        v-model="deadmanSwitchData.recipientLastName"
        type="text"
        label="Recipient last name"
        class="form-input mr-4 mb-4"
        :rules="[value => (value && regexName.test(value)) || 'Field is required']"
    />
    <va-input
        v-model="deadmanSwitchData.recipientEmail"
        type="email"
        label="Recipient email"
        class="form-input mr-4 mb-4"
        :rules="[value => (value && regexEmail.test(value)) || 'Field is required']"
    />
    <p>Switch settings</p>
    <va-icon
        class="mr-2"
        name="settings"
        size="2rem"
        color="inactive"
    />
    <div class="check-in-option-wrapper">
        <p>Check in every</p>
        <va-select style="width: 35px;" v-model="value" :options="options" />
        <p>day(s).</p>
    </div>
    
    <TimePicker />


    <p>Final message</p>
    <va-input
        class="mb-4"
        v-model="value"
        type="textarea"
        label="What does this person need to know?"
        placeholder="Hi ma, I won't be making it home for supper tonight. You know what to do."
        :min-rows="5"
        :max-rows="20"
    />
    
    <div class="cancel-submit-button-wrapper">
        <va-button color="danger" class="mr-4 mb-2">Cancel</va-button>
        <va-button color="success" class="mr-4 mb-2">Create</va-button>
    </div>

    <div v-if="errorMessage" class="va-title" style="color: var(--va-danger); width: 300px; text-align: center;">{{ errorMessage }}</div>

    

</va-form>





</template>



<script setup>

import { ref, reactive } from 'vue';
import CreateSwitchNavigation from '../create-switch/CreateSwitchNavigation.vue';
import TimePicker from '../create-switch/switchOptions/TimePicker.vue';



let value = ref('');
let options = [1, 2, 3];

let errorMessage = ref('');

let deadmanSwitchData = reactive({
    recipientFirstName: '',
    recipientLastName: '',
    recipientEmail: '',
    checkInIntervalInHours: 1,
    finalMessage: ''
});

</script>



<style lang="scss" scoped>


.signup-form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .check-in-option-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    p {
        text-align: center;
    }
    .cancel-submit-button-wrapper {
        display: flex;
    }
}

</style>
