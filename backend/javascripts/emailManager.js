config = require('dotenv').config();
const email_sk = process.env.SEND_IN_BLUE_API;
const SibApiV3Sdk = require('sib-api-v3-sdk');
// Send grid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

// let defaultClient = SibApiV3Sdk.ApiClient.instance;
// let apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = email_sk;
// let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
// let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

// ***********************************************************************************
// Function is called after a successful signup. Sends a verification link to the user
// ***********************************************************************************
exports.sendVerificationEmail = (firstName, lastName, email, verificationString, emailTemplateId) => {
    
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

// Extract just the checkInBytime from the Date Object
function extractTimeFromDateObject(dateObj) {
        
    let timeString = '';
    let hoursString = new Date(dateObj).getHours();
    let minutesString = new Date(dateObj).getMinutes();
    let secondsString = new Date(dateObj).getSeconds();
    let millisecondString = new Date(dateObj).getMilliseconds();
    hoursString = hoursString < 10 ? '0' + hoursString : hoursString
    minutesString = minutesString < 10 ? '0' + minutesString : minutesString
    secondsString = secondsString < 10 ? '0' + secondsString : secondsString
    timeString += hoursString + ':' + minutesString + ':' + secondsString + '.' + millisecondString;
    return timeString;
};

exports.sendFinalMessage = (deadmanAccountData, dmSwitch) => {
    
    const message = {
    
        to: dmSwitch.recipient_email,
        from: 'mspence5555@gmail.com',
        subject: 'Some subject',
        templateId: 'd-d5a538129abd45789c77ba456183cd90',
        dynamic_template_data: {
            'recipientName': `${dmSwitch.recipient_first_name} ${dmSwitch.recipient_last_name}`,
            'deadmanEmail': deadmanAccountData.email,
            'finalMessage': dmSwitch.final_message,
            'switchCreationDate': dmSwitch.created_at,
            'checkInIntervalInHours': dmSwitch.check_in_interval_in_hours,
            'checkInByTime':  extractTimeFromDateObject(dmSwitch.check_in_by_time),
            'lastCheckedInAt': dmSwitch.last_checked_in_at
        },
    };
    sgMail
    .send(message)
    .then(() => {
        console.log('send grid recipient sent successfully');
        return true;
    })
    .catch(error => {
        console.log('send grid recipient failed');
        console.error(error);
        return false;
    });

};

exports.sendAlertEmailToDeadman = (deadmanAccountData, dmSwitch) => {
    
    const message = {
    
        to: deadmanAccountData.email,
        from: 'mspence5555@gmail.com',
        subject: 'Some subject',
        templateId: 'd-03185b92e17f4e98bd8720b240ef7152',
        dynamic_template_data: {
            'recipientName': `${dmSwitch.recipient_first_name} ${dmSwitch.recipient_last_name}`,
            'recipientEmail': dmSwitch.recipient_email,
            'switchCreationDate': dmSwitch.created_at,
            'checkInIntervalInHours': dmSwitch.check_in_interval_in_hours,
            'checkInByTime':  extractTimeFromDateObject(dmSwitch.check_in_by_time),
            'lastCheckedInAt': dmSwitch.last_checked_in_at
        },
    };
    sgMail
    .send(message)
    .then(() => {
        console.log('send grid alert deadman sent successfully');
        return true;
    })
    .catch(error => {
        console.log('send grid alert deadman failed');
        console.error(error);
        return false;
    });
};
