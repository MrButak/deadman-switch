config = require('dotenv').config();
const email_sk = process.env.SEND_IN_BLUE_API;

exports.sendVerificationEmail = (firstName, lastName, email, verificationString) => {
    
    var SibApiV3Sdk = require('sib-api-v3-sdk');
    var defaultClient = SibApiV3Sdk.ApiClient.instance;
    var apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = email_sk;
    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    
    sendSmtpEmail = {

        to: [{
            email: email,
            name: `${firstName} ${lastName}`
        }],
        templateId: 1,
        params: {
            
            'customerName': `${firstName} ${lastName}`,
            'verificationLink': `${process.env.VITE_BASE_URL}api/email/verify${verificationString}`
        },
    
        headers: {
            'X-Mailin-custom': `api-key: ${process.env.SEND_IN_BLUE_API}|content-type: application/json|accept: application/json`
        }
    };
    
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('email API called successfully.');
        console.log(data);
        return true;
        
    }, 
    function(error) {
        console.error(error);
        return false;
    });
};
