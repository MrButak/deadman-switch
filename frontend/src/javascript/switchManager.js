// Function calculates the seconds before the user needs to check in
function secondsBeforeSwitchExpires(checkInByTimestamp) {

    // Calculate seconds until switch Expires
    let secondsUntilSwitchFlipped =
        ( (new Date(checkInByTimestamp).getTime() / 1000 ) - ( new Date(Date.now()) ) / 1000 );

    // Countdown timer can't take a negative number
    if(secondsUntilSwitchFlipped < 0) { return 0 };

    return secondsUntilSwitchFlipped;    
};

export { secondsBeforeSwitchExpires }
