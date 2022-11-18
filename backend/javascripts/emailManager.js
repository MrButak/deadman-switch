config = require('dotenv').config();
// Send in blue
const email_sk = process.env.SEND_IN_BLUE_API;
const SibApiV3Sdk = require('sib-api-v3-sdk');
// Send grid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

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

sendFinalMessage = async (deadmanAccountData, dmSwitch) => {
    console.log('Making it to sendFinalEmail')
    // Send in blue API
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
            'deadmanEmail': deadmanAccountData.email,
            'finalMessage': dmSwitch.final_message,
            'switchCreationDate': dmSwitch.created_at,
            'checkInIntervalInHours': dmSwitch.check_in_interval_in_hours,
            'checkInByTime':  extractTimeFromDateObject(dmSwitch.check_in_by_time),
            'lastCheckedInAt': dmSwitch.last_checked_in_at
        },
    
        headers: {
            'X-Mailin-custom': `api-key: ${process.env.SEND_IN_BLUE_API}|content-type: application/json|accept: application/json`
        }
    };
    
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('Send final success', data)
        return true;
    }, 
    function(error) {
        console.error(error);
        console.log('Send final fail')
        return false;
    });

    // Send grid API
    //     const message = {
    // dynamic_template_data is accessed on the email template with no dot notation example: Dear {{{recipientName}}}, how are you?
    //         to: dmSwitch.recipient_email,
    //         from: 'mspence5555@gmail.com',
    //         templateId: 'd-d5a538129abd45789c77ba456183cd90',
    //         dynamic_template_data: {
    //             'recipientName': `${dmSwitch.recipient_first_name} ${dmSwitch.recipient_last_name}`,
    //             'deadmanEmail': deadmanAccountData.email,
    //             'finalMessage': dmSwitch.final_message,
    //             'switchCreationDate': dmSwitch.created_at,
    //             'checkInIntervalInHours': dmSwitch.check_in_interval_in_hours,
    //             'checkInByTime':  extractTimeFromDateObject(dmSwitch.check_in_by_time),
    //             'lastCheckedInAt': dmSwitch.last_checked_in_at
    //         },
    //     };
    //     let emailSent = sgMail
    //     .send(message)
    //     .then(() => {
    //         return true;    
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         return false;
    //     });
    //     return emailSent;
    // };

};

// Function NOT IN USE
sendAlertEmailToDeadman = async (deadmanAccountData, dmSwitch) => {

    const message = {
    
        to: deadmanAccountData.email,
        from: 'xxxx',
        templateId: 'd-03185b92e17f4e98bd8720b240ef7152',
        dynamic_template_data: {
            'recipientEmail': dmSwitch.recipient_email,
            'switchCreationDate': dmSwitch.created_at,
            'checkInIntervalInHours': dmSwitch.check_in_interval_in_hours,
            'checkInByTime':  extractTimeFromDateObject(dmSwitch.check_in_by_time),
            'lastCheckedInAt': dmSwitch.last_checked_in_at
        },
    };
    let emailSent = sgMail
    .send(message)
    .then(() => {
        return true;
    })
    .catch(error => {
        console.error(error);
        return false;
    });

    return emailSent;
};

// Testing
// (async() => {
//     let deadmanAccountData = {
//         id: 4,
//         first_name: 'Billy',
//         last_name: 'Hoggins',
//         email: 'xxxxx',
//         password: '$2a$10$x5H6Cq/8UfWSSzaelwksM.H5Qab8iqOS0EC3sBirxBy43GOSeUv8a',
//         creation_date: new Date('2022-11-17T15:50:46.317Z'),
//         provider: 'email',
//         email_verification_string: null,
//         email_verified: true
//     };
//     let dmSwitch = {
//         id: 55,
//         user_id: 4,
//         switch_name: 'switch name',
//         created_at: new Date('2022-11-18T11:52:40.535Z'),
//         check_in_interval_in_hours: 24,
//         check_in_by_time: new Date('2022-11-18T11:56:21.627Z'),
//         last_checked_in_at: new Date('2022-11-17T11:56:21.627Z'),
//         recipient_email: 'xxxxx',
//         recipient_first_name: 'dsfdsf',
//         recipient_last_name: 'sdfs',
//         final_message: "Hi ma, I won't be making it home for supper tonight. You know what to do.",
//         triggered: false
//     }
//     let finalMessageSent = await sendFinalMessage(deadmanAccountData, dmSwitch);
//     console.log({finalMessageSent})
//     let alertMessageSent = await sendAlertEmailToDeadman(deadmanAccountData, dmSwitch)
//     console.log({alertMessageSent})
// })();
