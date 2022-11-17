config = require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./backend/routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

// Allow requests from Vue front end
app.use(function (req, res, next) {

    if(process.env.APP_ENVIRONMENT == 'development') {
        res.header("Access-Control-Allow-Origin", "*");    
    }
    else if(process.env.APP_ENVIRONMENT == 'production') {
        res.header("Access-Control-Allow-Origin", "https://deadmanswitchapp.herokuapp.com/");  ;
    };
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Check for expired switches every 1 minute
const cron = require('node-cron');
const { checkForExpiredSwitches, deactivateExpiredSwitch, getUserAccountData, deleteExpiredSwitch } = require('./backend/javascripts/databaseManager');
const { sendFinalMessage, sendAlertEmailToDeadman } = require('./backend/javascripts/emailManager');

async function handleDeadmanSwitchExpired(dmSwitch) {

    // Get the deadman's account information
    let deadmanAccountData = await getUserAccountData(dmSwitch.user_id);
    // console.log({deadmanAccountData})
    // console.log('deadman account data from the DB ^^^^^^^ in app.js')
    

    // Deactivate switch
    let switchDeactivated = await deactivateExpiredSwitch(dmSwitch.id, dmSwitch.user_id);
    // console.log({switchDeactivated})
    if(switchDeactivated) {

        console.log('Makinging inside of the switchDeactivated block')
        // Send an email with their final message to their contact
        sendFinalMessage(deadmanAccountData, dmSwitch);
        // console.log({finalMessageSent})
        // Send an email to them in case they are still alive, letting them know the their switch has expired
        sendAlertEmailToDeadman(deadmanAccountData, dmSwitch);
        // console.log({alertEmailSentToDeadman});
        // Only if the final message has been sent, delete the switch
        // if(finalMessageSent) {
        //     console.log('final message sent and switch deactivated')
        //     // Delete switch?
        //     // await deleteExpiredSwitch(deadmanAccountData.id, dmSwitch.id);
        // };
    };
    
};
cron.schedule('* * * * *', async () => {

    let expiredSwitches = await checkForExpiredSwitches();
    console.log('cron job, 1 minute')
    if(expiredSwitches[0]) {

        // for(const dmSwitch of expiredSwitches[1]) {
        //     await handleDeadmanSwitchExpired(dmSwitch);
        // };
        expiredSwitches[1].forEach((dmSwitch) => {
            handleDeadmanSwitchExpired(dmSwitch);
        });
        
            
            
      
    };
});

app.use('/', express.static(path.join(__dirname, 'public', 'dist')));
app.use('/css', express.static(path.join(__dirname, 'public', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'dist', 'js')));

app.use('/', indexRouter);

module.exports = app;
