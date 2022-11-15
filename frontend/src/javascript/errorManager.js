import { regexEmail, regexName,
        newSwitchData,
        formErrorMessages, // Object of all error that could happen on a form
        createSwitchReviewErrorMessages, // Array holds all form and option error messages when creating a new switch
        secondsBeforeNewSwitchFlipped
} from './stateManager';


// ****************************************************************************
// Function will check is an error message is already displayed on the DOM
// ****************************************************************************
function errorMessageShown(errorId, errorMessagesArray) {

    return errorMessagesArray.findIndex(error => error.id == errorId) != -1;
};

// ****************************************************************************
// Function will remove an error message from the DOM
// ****************************************************************************
function removeErrorMessage(errorId, errorMessagesArray) {

    let errorIndex = errorMessagesArray.findIndex(error => error.id == errorId);
    if(errorIndex == -1) { return };
    errorMessagesArray.splice(errorIndex, 1);
};

// ****************************************************************************
// Function will check for valid form fields and options when the user creates a new switch
// ****************************************************************************
function handleCreateSwitchFormErrorMessages() {

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

    // Switch creation invalid checkin time (must be > 3 minutes left before user has to checkin)
    if( secondsBeforeNewSwitchFlipped.value < 180 &&
        !errorMessageShown(formErrorMessages.mustCreateSwitchWithTimeBuffer.id, createSwitchReviewErrorMessages) ) {

            createSwitchReviewErrorMessages.push(formErrorMessages.mustCreateSwitchWithTimeBuffer);
    }
    else if(secondsBeforeNewSwitchFlipped.value > 180 &&
        errorMessageShown(formErrorMessages.mustCreateSwitchWithTimeBuffer.id, createSwitchReviewErrorMessages)) {
        
            removeErrorMessage(formErrorMessages.mustCreateSwitchWithTimeBuffer.id, createSwitchReviewErrorMessages);
    };
};

export { handleCreateSwitchFormErrorMessages }