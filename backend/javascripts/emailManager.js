config = require('dotenv').config();
// Send in blue
const email_sk = process.env.SEND_IN_BLUE_API;
const SibApiV3Sdk = require('sib-api-v3-sdk');
const { decryptString } = require('./utils/utils');

// ***********************************************************************************
// Function is called after a successful signup. Sends a verification link to the user
// ***********************************************************************************
exports.sendVerificationEmail = async (firstName, lastName, email, verificationString, emailTemplateId) => {
    
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = email_sk;
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail = {

        to: [{
            email: email,
            name: `${firstName} ${lastName}`
        }],
        templateId: emailTemplateId,
        params: {
            
            'customerName': `${firstName} ${lastName}`,
            'verificationLink': `${process.env.VITE_BASE_URL}api/email/verify/${verificationString}`
        },
    
        headers: {
            'X-Mailin-custom': `api-key: ${process.env.SEND_IN_BLUE_API}|content-type: application/json|accept: application/json`
        }
    };
    
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        return true;
    }, 
    function(error) {
        console.error(error);
        return false;
    });
};

// ***********************************************************************************
// Function extracts just the HH:MM:SS:MS from the Date Object
// ***********************************************************************************
function extractTimeFromDateObject(dateObj) {
        
    let timeString = '';
    let hoursString = new Date(dateObj).getHours();
    let minutesString = new Date(dateObj).getMinutes();
    let secondsString = new Date(dateObj).getSeconds();
    let millisecondString = new Date(dateObj).getMilliseconds();
    hoursString = hoursString < 10 ? '0' + hoursString : hoursString
    minutesString = minutesString < 10 ? '0' + minutesString : minutesString
    secondsString = secondsString < 10 ? '0' + secondsString : secondsString
    timeString += hoursString + ':' + minutesString + ':' + secondsString;
    return timeString;
};

// ***********************************************************************************
// Function is called when a users switch expires
// ***********************************************************************************
exports.sendFinalMessage = async (deadmanAccountData, dmSwitch) => {
    console.log({deadmanAccountData})
    console.log('Here in final message')
    // Send in blue API
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = email_sk;
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail = {

        to: [{
            email: decryptString(dmSwitch.recipient_email),
            name: `${decryptString(dmSwitch.recipient_first_name)} ${decryptString(dmSwitch.recipient_last_name)}`
        }],
        templateId: 3,
        params: {
            
            'recipientName': `${decryptString(dmSwitch.recipient_first_name)} ${decryptString(dmSwitch.recipient_last_name)}`,
            'deadmanEmail': deadmanAccountData.email,
            'deadmanFirstName': deadmanAccountData.first_name,
            'deadmanLastName': deadmanAccountData.last_name,
            'finalMessage': decryptString(dmSwitch.final_message),
            'switchCreationDate': new Date(dmSwitch.created_at).toLocaleString(),
            'checkInIntervalInHours': dmSwitch.check_in_interval_in_hours,
            'checkInByTime':  extractTimeFromDateObject(dmSwitch.check_in_by_timestamp),
            'lastCheckedInAt': new Date(dmSwitch.last_checked_in_at).toLocaleString()
        },
    
        headers: {
            'X-Mailin-custom': `api-key: ${process.env.SEND_IN_BLUE_API}|content-type: application/json|accept: application/json`
        }
    };
    
    let messageSent = apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('Send final success', data)
        return true;
    }, 
    function(error) {
        console.error(error);
        console.log('Send final fail')
        return false;
    });

    return messageSent;
};

// Function NOT IN USE
exports.sendAlertEmailToDeadman = async (deadmanAccountData, dmSwitch) => {

    
};
