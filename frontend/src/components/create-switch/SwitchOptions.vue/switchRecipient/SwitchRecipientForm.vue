<template>
    
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
        <p>Final message</p>
        <va-input
            class="mb-4"
            v-model="finalMessage"
            type="textarea"
            label="What does this person need to know?"
            placeholder="Hi ma, I won't be making it home for supper tonight. You know what to do."
            :min-rows="5"
            :max-rows="20"
        />    
    
    </va-form>

</template>



<script setup>

import { ref, reactive } from 'vue';

let finalMessage = ref('');

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
}

</style>
