config = require('dotenv').config();
const email_sk = process.env.SEND_IN_BLUE_API;
const SibApiV3Sdk = require('sib-api-v3-sdk');
// Send grid
// const client = require('@sendgrid/client');
// client.setApiKey(process.env.SEND_GRID_API);

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

exports.sendFinalMessage = (deadmanAccountData, dmSwitch) => {
    
   

    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SEND_GRID_API);
    // const msg = {
    // to: 'dmSwitch.recipient_email',
    // from: 'mspence5555@gmail.com',
    // templateId: 'd-d5a538129abd45789c77ba456183cd90',
    // dynamic_template_data: {
    //     'subject': 'You are a deadman switch recipient. Important.',
    //     'name': 'dynamicname'
    //     // 'name': `${dmSwitch.recipient_first_name} ${dmSwitch.recipient_last_name}`,
    //     // 'recipientName': `${dmSwitch.recipient_first_name} ${dmSwitch.recipient_last_name}`,
    //     // 'deadmanEmail': `${deadmanAccountData.email}`,
    //     // 'finalMessage': `${dmSwitch.final_message}`,
    //     // 'switchCreationDate': `${dmSwitch.created_at}`,
    //     // 'checkInIntervalInHours': `${dmSwitch.check_in_interval_in_hours}` 
    // },
    // };
    // sgMail
    // .send(msg)
    // .then(() => { return true })
    // .catch((error) => {
    //     console.log(error);
    //     return false;
    // });


    // const client = require('@sendgrid/mail');
    // client.setApiKey(process.env.SEND_GRID_API);

    // const message = {
    
    //     to: 'dmSwitch.recipient_email',
    //     from: 'mspence5555@gmail.com',
    //     templateId: 'd-d5a538129abd45789c77ba456183cd90',
    //     dynamic_template_data: {
    //         'subject': 'You are a deadman switch recipient. Important.',
    //         'name': `${dmSwitch.recipient_first_name} ${dmSwitch.recipient_last_name}`,
    //         'recipientName': `${dmSwitch.recipient_first_name} ${dmSwitch.recipient_last_name}`,
    //         'deadmanEmail': `${deadmanAccountData.email}`,
    //         'finalMessage': `${dmSwitch.final_message}`,
    //         'switchCreationDate': `${dmSwitch.created_at}`,
    //         'checkInIntervalInHours': `${dmSwitch.check_in_interval_in_hours}` 
    //     },
    // };
    // client
    // .send(message)
    // .then(() => console.log('Mail sent successfully'))
    // .catch(error => {
    //     console.error(error);
    // });

    
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = email_sk;
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail = {

        to: [{
            email: dmSwitch.recipient_email,
            name: `${dmSwitch.recipient_first_name} ${dmSwitch.recipient_last_name}`
        }],
        templateId: 3,
        params: {
            
            'recipientName': `${dmSwitch.recipient_first_name} ${dmSwitch.recipient_last_name}`,
            'deadmanEmail': `${deadmanAccountData.email}`,
            'finalMessage': `${dmSwitch.final_message}`,
            'switchCreationDate': `${dmSwitch.created_at}`,
            'checkInIntervalInHours': `${dmSwitch.check_in_interval_in_hours}` 
        },
    
        headers: {
            'X-Mailin-custom': `api-key: ${process.env.SEND_IN_BLUE_API}|content-type: application/json|accept: application/json`
        }
    };
    
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('email to recipient sent', data)
        return true;
    }, 
    function(error) {
        console.error(error);
        // console.log('Final message email error ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
        // console.log({deadmanAccountData})
        // console.log({dmSwitch})
        // console.log('Variables used in final message email error ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
        return false;
    });
};

exports.sendAlertEmailToDeadman = (deadmanAccountData, dmSwitch) => {

    console.log({deadmanAccountData})
    console.log({dmSwitch})
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


    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = email_sk;
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    let readableCheckInByTime = extractTimeFromDateObject(dmSwitch.check_in_by_time);
    let firstName = 'Some'
    let lastName = 'Name'

    sendSmtpEmail = {

        to: [{
            email: deadmanAccountData.email,
            name: `${dmSwitch.recipient_first_name} ${dmSwitch.recipient_last_name}`
        }],
        templateId: 4,
        params: {
            
            'recipientName': `${dmSwitch.recipient_first_name} ${dmSwitch.recipient_last_name}`,
            'finalMessage': `${dmSwitch.final_message}`,
            'switchName': `${dmSwitch.switch_name}`,
            'switchCreationDate': `${dmSwitch.created_at}`,
            'checkInIntervalInHours': `${dmSwitch.check_in_interval_in_hours}`,
            'checkInByTime': `${readableCheckInByTime}`,
            'lastCheckedInAt': `${dmSwitch.last_checked_in_at}`
        },
    
        headers: {
            'X-Mailin-custom': `api-key: ${process.env.SEND_IN_BLUE_API}|content-type: application/json|accept: application/json`
        }
    };
    
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('email to deadman sent', data)
        return true;
    }, 
    function(error) {
        console.error(error);
        return false;
    });
};
