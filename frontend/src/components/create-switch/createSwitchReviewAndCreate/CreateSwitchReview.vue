<template>

<div class="review-switch-wrapper row row">
    <div class="flex md6 lg4">
      <va-card>
        <va-card-title>Recipient information</va-card-title>
        <va-card-actions align="between">
          <p style="padding: 0 2rem 0 0">First name</p>
          <p style="padding: 0 0 0 2rem" class="va-text-warning">{{ newSwitchData.recipientFirstName }}</p>
        </va-card-actions>
        <va-card-actions align="between">
          <p style="padding: 0 2rem 0 0">Last name</p>
          <p style="padding: 0 0 0 2rem" class="va-text-warning">{{ newSwitchData.recipientLastName }}</p>
        </va-card-actions>
        <va-card-actions align="between">
          <p style="padding: 0 2rem 0 0">Email</p>
          <p style="padding: 0 0 0 2rem" class="va-text-warning">{{ newSwitchData.recipientEmail }}</p>
        </va-card-actions>
        <va-card-actions align="between">
          <p style="padding: 0 2rem 0 0">Final message</p>
          <va-icon
            @click="showModalWithFixedLayout = !showModalWithFixedLayout"
            class="mr-2"
            name="preview"
            size="2rem"
            color="active"
        />

        </va-card-actions>

        <va-card-title>Switch settings</va-card-title>
        <va-card-actions align="between">
          <p>Check in every</p>
          <p class="va-text-warning">{{ newSwitchData.checkInIntervalInDays }} day</p>
        </va-card-actions>
        <va-card-actions align="between">
          <p style="padding: 0 2rem 0 0">No later than</p>
          <p style="padding: 0 0 0 2rem">{{ newSwitchData.checkInTime.toLocaleTimeString() }}</p>
        </va-card-actions>

      </va-card>

      

    </div>
</div>
    <!-- Final message popup modal -->
<va-modal
    v-model="showFinalMessageModal"
    title="Final message"
    :message="finalMessage"
    fixed-layout
/>

</template>



<script setup>

import { ref, computed, onMounted } from 'vue';
import { newSwitchData, createSwitchReviewErrorMessages,
        regexName, regexPassword, regexEmail
} from '../../../../javascripts/stateManager';

//     color: 'warning', // success
//     icon: 'info', // check_circle
//     text: 'error message' //

let formErrorMessages = {
    'firstName': {
        'id': 1,
        'text': 'Invalid first name',
        'icon': 'info',
        'color': 'warning'
    },
    'lastName': {
        'id': 2,
        'text': 'Invalid last name',
        'icon': 'info',
        'color': 'warning'
    },
    'email': {
        'id': 3,
        'text': 'Invalid email',
        'icon': 'info',
        'color': 'warning'
    },
    'checkInIntervalInDays': {
        'id': 4,
        'text': 'Invalid checkin interval. Must be between 1 - 3',
        'icon': 'info',
        'color': 'warning'
    }
}

function errorMessageShown(errorId, errorMessagesArray) {

    return errorMessagesArray.findIndex(error => error.id == errorId) != -1;
};

function removeErrorMessage(errorId, errorMessagesArray) {

    let errorIndex = errorMessagesArray.findIndex(error => error.id == errorId);
    if(errorIndex == -1) { return };
    errorMessagesArray.splice(errorIndex, 1);
};

onMounted(() => {

    // Check for errors

    // First name
    if( !regexName.test(newSwitchData.recipientFirstName) &&
        !errorMessageShown(formErrorMessages.firstName.id, createSwitchReviewErrorMessages) ) {
        
            createSwitchReviewErrorMessages.push(formErrorMessages.firstName);
    }
    else if(regexName.test(newSwitchData.recipientFirstName) && 
        errorMessageShown(formErrorMessages.firstName.id, createSwitchReviewErrorMessages)) {
        
            removeErrorMessage(formErrorMessages.firstName.id, createSwitchReviewErrorMessages);
    };

    // Last name
    if( !regexName.test(newSwitchData.recipientLastName) &&
        !errorMessageShown(formErrorMessages.lastName.id, createSwitchReviewErrorMessages) ) {

            createSwitchReviewErrorMessages.push(formErrorMessages.lastName);
    }
    else if(regexName.test(newSwitchData.recipientLastName) &&
        errorMessageShown(formErrorMessages.lastName.id, createSwitchReviewErrorMessages)) {
        
            removeErrorMessage(formErrorMessages.lastName.id, createSwitchReviewErrorMessages);
    };

    // Email
    if( !regexEmail.test(newSwitchData.recipientEmail) &&
        !errorMessageShown(formErrorMessages.email.id, createSwitchReviewErrorMessages) ) {

            createSwitchReviewErrorMessages.push(formErrorMessages.email);
    }
    else if(regexEmail.test(newSwitchData.recipientEmail) &&
        errorMessageShown(formErrorMessages.email.id, createSwitchReviewErrorMessages)) {
        
            removeErrorMessage(formErrorMessages.email.id, createSwitchReviewErrorMessages);
    };

});

// Default final message
let finalMessage = computed(() => {
    return !newSwitchData.finalMessage ?
        'Hi ma, I won\'t be making it home for supper tonight. You know what to do.' :
        newSwitchData.finalMessage;
});
let showFinalMessageModal = ref(false);

</script>



<style lang="scss">

.review-switch-wrapper {
    justify-content: center;
}

</style>
    