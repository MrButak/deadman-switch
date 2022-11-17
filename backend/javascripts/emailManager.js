config = require('dotenv').config();
const email_sk = process.env.SEND_IN_BLUE_API;
let SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = email_sk;
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

// ***********************************************************************************
// Function is called after a successful signup. Sends a verification link to the user
// ***********************************************************************************
exports.sendVerificationEmail = (firstName, lastName, email, verificationString, emailTemplateId) => {
    
    // let SibApiV3Sdk = require('sib-api-v3-sdk');
    // let defaultClient = SibApiV3Sdk.ApiClient.instance;
    // let apiKey = defaultClient.authentications['api-key'];
    // apiKey.apiKey = email_sk;
    // let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    // let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    
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

exports.sendFinalMessage = async (deadmanAccountData, dmSwitch) => {

};

exports.sendAlertEmailToDeadman = async(deadmanAccountData, dmSwitch) => {

};